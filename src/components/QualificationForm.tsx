import React, { useState, useCallback, useRef, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowRight, CheckCircle2, Gift, Truck, Package, ShieldCheck, Lock } from 'lucide-react';
import { t3 } from '@/lib/t3';
import { getSessionAttribution } from '@/lib/attribution';
import { prospectEmailFromUrl } from '@/lib/prospect';
import { CALENDLY_RDV_URL } from '@/lib/links';
import { trackCTAClick } from '@/lib/tracking';
import { supabase } from '@/integrations/supabase/client';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

type ProjectType = 'stock_order' | 'white_label' | 'exploring' | 'unset';

interface FormState {
  name: string;
  company: string;
  email: string;
  country: string;
  website: string;
  street: string;
  postalCode: string;
  city: string;
  role: string;
  phone: string;
  message: string;
  projectType: ProjectType;
}

const COUNTRIES = [
  'France', 'Belgium', 'Switzerland', 'Luxembourg', 'Germany', 'Netherlands',
  'Spain', 'Portugal', 'Italy', 'United Kingdom', 'Ireland', 'Austria',
  'Denmark', 'Sweden', 'Norway', 'Finland', 'Poland', 'Czech Republic',
  'United States', 'Canada', 'Mexico', 'Brazil', 'Argentina',
  'United Arab Emirates', 'Saudi Arabia', 'Qatar', 'Kuwait', 'Bahrain',
  'Japan', 'South Korea', 'China', 'Hong Kong', 'Singapore', 'Australia',
  'New Zealand', 'Morocco', 'Tunisia', 'South Africa', 'Other',
];

// International postal code: 3–10 alphanumerics, optionally separated by space or hyphen.
const POSTAL_CODE_PATTERN = /^[A-Za-z0-9][A-Za-z0-9\s-]{1,8}[A-Za-z0-9]$/;

// Countries with no postal code system (or optional) — never block sample requests here.
const POSTAL_OPTIONAL_COUNTRIES = new Set<string>([
  'United Arab Emirates',
  'Hong Kong',
  'Other',
]);


const PROJECT_TYPE_TO_LABEL: Record<ProjectType, string> = {
  stock_order: 'Stock order',
  white_label: 'White-label production',
  exploring: 'Just exploring for now',
  unset: 'Unspecified',
};

const intentForGtag = (p: ProjectType): string => {
  if (p === 'stock_order') return 'stock';
  if (p === 'white_label') return 'whitelabel';
  if (p === 'exploring') return 'exploring';
  return 'unset';
};

// Le type de projet choisi plus haut sur la page (boutons « Parler de mon projet » / « Demander un devis »)
// est mémorisé dans l'adresse (?type=white-label ou ?type=stock) : on le présélectionne dans le formulaire.
const projectTypeFromUrl = (): ProjectType | null => {
  try {
    const t = (new URLSearchParams(window.location.search).get('type') || '').toLowerCase();
    if (t === 'white-label' || t === 'white_label') return 'white_label';
    if (t === 'stock' || t === 'order' || t === 'stock_order') return 'stock_order';
    if (t === 'exploring') return 'exploring';
  } catch { /* adresse illisible : on ne présélectionne rien */ }
  return null;
};

// Le site web de la société est déduit de l'adresse email professionnelle (jane@marque.com -> marque.com),
// sauf pour les messageries grand public. Le visiteur peut le corriger ; le champ n'est plus obligatoire (17/10/2026).
const WEBMAIL = /^(gmail|googlemail|hotmail|outlook|live|msn|yahoo|ymail|icloud|me|mac|aol|gmx|web|proton|protonmail|pm|orange|free|sfr|laposte|wanadoo|bbox|neuf|club-internet|libero|virgilio|tiscali|t-online|freenet|seznam|wp|o2|interia|yandex|mail|qq|163|126|naver|hey|zoho)\./i;
const domainFromEmail = (email: string): string => {
  const m = email.trim().toLowerCase().match(/@([a-z0-9-]+(?:\.[a-z0-9-]+)*\.[a-z]{2,})$/);
  if (!m) return '';
  return WEBMAIL.test(m[1]) ? '' : m[1];
};

const getUtmParams = (): Record<string, string> => {
  try {
    const sp = new URLSearchParams(window.location.search);
    const out: Record<string, string> = {};
    ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'].forEach((k) => {
      const v = sp.get(k);
      if (v) out[k] = v;
    });
    return out;
  } catch { return {}; }
};

const QualificationForm: React.FC = () => {
  const { language } = useLanguage();
  const formStartedRef = useRef(false);
  const leadFiredRef = useRef(false);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const siteAuto = useRef(false); // vrai tant que le site web a été rempli automatiquement depuis l'email
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [data, setData] = useState<FormState>(() => {
    const email = prospectEmailFromUrl();
    const site = domainFromEmail(email);
    if (site) siteAuto.current = true;
    return {
    name: '',
    company: '',
    email,
    country: '',
    website: site,
    street: '',
    postalCode: '',
    city: '',
    role: '',
    phone: '',
    message: '',
    projectType: projectTypeFromUrl() ?? 'unset',
    };
  });

  const update = useCallback(<K extends keyof FormState>(field: K, value: FormState[K]) => {
    setData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  }, []);

  // Un bouton de la page (« Parler de mon projet », « Demander un devis ») vient de choisir le type de projet.
  useEffect(() => {
    const sync = () => {
      const t = projectTypeFromUrl();
      if (t) setData((prev) => (prev.projectType === t ? prev : { ...prev, projectType: t }));
    };
    window.addEventListener('tolia:pathchange', sync);
    return () => window.removeEventListener('tolia:pathchange', sync);
  }, []);


  const handleFormStart = () => {
    if (!formStartedRef.current) {
      formStartedRef.current = true;
      window.gtag?.('event', 'form_start', { form_id: 'sample_request_main' });
    }
  };

  const requiredMsg = t3(language, 'Ce champ est obligatoire', 'This field is required', 'Este campo es obligatorio');

  const validateStep1 = (): boolean => {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (!data.email.trim()) next.email = requiredMsg;
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
      next.email = t3(language, 'Email invalide', 'Invalid email', 'Email no válido');
    if (!data.name.trim()) next.name = requiredMsg;
    if (!data.company.trim()) next.company = requiredMsg;
    // site web facultatif (rempli d'office depuis l'email) ; le pays est demandé à l'étape 2, avec l'adresse
    const site = data.website.trim();
    if (site && !/^(https?:\/\/)?([\w-]+\.)+[a-z]{2,}(\/.*)?$/i.test(site))
      next.website = t3(language, 'Site web invalide', 'Invalid website', 'Sitio web no válido');
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const validateStep2 = (): boolean => {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (!data.country) next.country = requiredMsg;

    const street = data.street.trim();
    if (!street) {
      next.street = t3(
        language,
        "Merci d'indiquer votre adresse",
        'Please enter your street address',
        'Por favor, indique su dirección'
      );
    } else if (street.length < 5) {
      next.street = t3(
        language,
        "L'adresse doit comporter au moins 5 caractères",
        'Street address must be at least 5 characters',
        'La dirección debe tener al menos 5 caracteres'
      );
    }


    const postal = data.postalCode.trim();
    const postalOptional = POSTAL_OPTIONAL_COUNTRIES.has(data.country);
    if (!postal) {
      if (!postalOptional) {
        next.postalCode = t3(
          language,
          'Merci d\'indiquer votre code postal',
          'Please enter your postal code',
          'Por favor, indique su código postal'
        );
      }
    } else if (!POSTAL_CODE_PATTERN.test(postal)) {
      next.postalCode = t3(
        language,
        'Code postal invalide',
        'Invalid postal code',
        'Código postal no válido'
      );
    }


    const city = data.city.trim();
    if (!city) {
      next.city = t3(
        language,
        'Merci d\'indiquer votre ville',
        'Please enter your city',
        'Por favor, indique su ciudad'
      );
    } else if (city.length < 2) {
      next.city = t3(language, 'Ville invalide', 'Invalid city', 'Ciudad no válida');
    }


    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleStep1Submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep1()) return;
    setIsSubmitting(true);

    const intent = intentForGtag(data.projectType);
    const utms = getUtmParams();
    const attribution = getSessionAttribution();
    let leadSaved = false;

    // Persist the lead first — only count the conversion if the backend confirms.
    try {
      const { error } = await supabase.functions.invoke('send-qualification-form', {
        body: {
          stage: 'lead',
          name: data.name,
          company: data.company,
          email: data.email,
          country: data.country,
          website: data.website.trim(),
          project_type: data.projectType,
          project_type_label: PROJECT_TYPE_TO_LABEL[data.projectType],
          ...utms,
          ...attribution,
        },
      });
      if (error) throw error;
      leadSaved = true;
    } catch (err) {
      console.error('Lead save error (step 1):', err);
    }

    // Fire GA4 conversion events only after a confirmed save, and only once.
    if (leadSaved && !leadFiredRef.current) {
      leadFiredRef.current = true;
      window.gtag?.('event', 'form_submit', {
        form_id: 'sample_request_main',
        step: 1,
        intent,
        ...utms,
      });
      window.gtag?.('event', 'generate_lead', {
        form_id: 'sample_request_main',
        prospect_email: data.email,
        intent,
        ...utms,
      });
      window.gtag?.('event', 'sample_requested', {
        prospect_email: data.email,
        intent,
        ...utms,
      });
    }

    setIsSubmitting(false);
    // Advance to step 2 regardless: user can still complete shipping; if the
    // lead failed to save, step 2's submit will resend full data anyway.
    setStep(2);
  };

  const handleStep2Submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep2()) return;
    setIsSubmitting(true);

    const street = data.street.trim();
    const postal = data.postalCode.trim();
    const city = data.city.trim();
    const composedAddress = postal
      ? `${street}\n${postal} ${city}`
      : `${street}\n${city}`;


    try {
      await supabase.functions.invoke('send-qualification-form', {
        body: {
          stage: 'shipping',
          name: data.name,
          company: data.company,
          email: data.email,
          country: data.country,
          website: data.website.trim(),
          address: composedAddress,
          address_street: street,
          address_postal_code: postal,
          address_city: city,
          role: data.role,
          phone: data.phone,
          message: data.message.trim().slice(0, 1000),
          project_type: data.projectType,
          project_type_label: PROJECT_TYPE_TO_LABEL[data.projectType],
          ...getUtmParams(),
          ...getSessionAttribution(),
        },
      });
    } catch (err) {
      console.error('Shipping submit error (step 2):', err);
    } finally {
      setIsSubmitting(false);
      setStep(3);
    }
  };

  if (step === 3) {
    const firstName = data.name.trim().split(' ')[0] || '';
    return (
      <div className="text-center py-10">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-6">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-semibold text-foreground mb-3">
          {t3(language, 'Merci', 'Thanks', 'Gracias')} {firstName} —{' '}
          {t3(
            language,
            'votre échantillon est en préparation.',
            'your sample is being prepared.',
            'su muestra está en preparación.'
          )}
        </h3>
        <p className="text-sm text-muted-foreground max-w-md mx-auto">
          {t3(
            language,
            "Suivi par email à l'adresse renseignée.",
            'Track it via the email confirmation we just sent you.',
            'Seguimiento por email en la dirección indicada.'
          )}
        </p>
        {/* Facultatif : proposé après la demande, pour ceux qui préfèrent en parler. L'échantillon part de toute façon. */}
        <div className="mt-8 border-t border-border/60 pt-6 max-w-md mx-auto">
          <p className="text-sm text-muted-foreground">
            {t3(
              language,
              "Envie d'en parler ? 30 minutes avec Simon Desbuisson pour confirmer votre adresse, voir Tolia en direct et vérifier qu'il convient à votre gamme.",
              'Prefer to talk it through? 30 minutes with Simon Desbuisson to confirm your address, see Tolia live and check it fits your range.',
              '¿Prefiere hablarlo? 30 minutos con Simon Desbuisson para confirmar su dirección, ver Tolia en directo y comprobar que encaja con su gama.'
            )}
          </p>
          <a
            href={CALENDLY_RDV_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackCTAClick('Book 30 min with Simon', 'sample-thanks', 'call_booking')}
            className="mt-4 inline-flex items-center gap-2 rounded-full border border-primary/40 px-5 py-2.5 text-sm font-semibold text-primary transition hover:bg-primary/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            {t3(language, 'Réserver 30 min avec Simon', 'Book 30 min with Simon', 'Reservar 30 min con Simon')}
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    );
  }

  const projectOptions: { value: ProjectType; label: string; sub: string }[] = [
    {
      value: 'stock_order',
      label: t3(language, 'Commande sur stock', 'Stock order', 'Pedido de stock'),
      sub: t3(language, 'dès 500 unités, expédition sous 72 h si en stock', 'from 500 units, ships within 72 h if in stock', 'desde 500 unidades, envío en 72 h si hay stock'),
    },
    {
      value: 'white_label',
      label: t3(language, 'Production marque blanche', 'White-label production', 'Producción marca blanca'),
      sub: t3(language, 'à partir de 3 000 unités, personnalisation complète', 'from 3,000 units, full customisation', 'desde 3.000 unidades, personalización completa'),
    },
    {
      value: 'exploring',
      label: t3(language, 'Je découvre, volumes à définir', 'Just exploring, volumes to be defined', 'Estoy explorando, volúmenes por definir'),
      sub: '',
    },
  ];

  if (step === 2) {
    return (
      <form onSubmit={handleStep2Submit} className="space-y-6" noValidate>
        <div className="text-center mb-2">
          <span className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-full" style={{ background: 'hsl(28 45% 48% / 0.12)', color: 'hsl(28 45% 38%)' }}>
            <Truck className="w-3.5 h-3.5" />
            {t3(language, 'Étape 2/2 · Livraison', 'Step 2/2 · Shipping', 'Paso 2/2 · Envío')}
          </span>
          <h3 className="text-2xl md:text-3xl font-bold text-foreground mt-4">
            {t3(
              language,
              'Parfait ! Où envoyons-nous votre échantillon ?',
              'Perfect! Where should we send your sample?',
              '¡Perfecto! ¿A dónde enviamos su muestra?'
            )}
          </h3>
          <p className="text-sm text-muted-foreground mt-2">
            {t3(
              language,
              'Adresse de livraison ; le reste est facultatif.',
              'Delivery address; everything else is optional.',
              'Dirección de entrega; lo demás es opcional.'
            )}
          </p>
        </div>

        <div className="grid gap-4">
          <div className="space-y-1.5">
            <Label htmlFor="qf-country-2">{t3(language, 'Pays', 'Country', 'País')} *</Label>
            <Select value={data.country} onValueChange={(v) => update('country', v)} required>
              <SelectTrigger id="qf-country-2" className="h-11 rounded-xl" aria-invalid={!!errors.country} aria-required="true">
                <SelectValue placeholder={t3(language, 'Sélectionner', 'Select', 'Seleccionar')} />
              </SelectTrigger>
              <SelectContent className="bg-card max-h-72">
                {COUNTRIES.map((c) => (
                  <SelectItem key={c} value={c}>{c}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.country && <p className="text-[13px] text-destructive">{errors.country}</p>}
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="qf-street">{t3(language, 'Adresse', 'Street address', 'Dirección')} *</Label>
            <Input
              id="qf-street"
              required
              autoComplete="address-line1"
              value={data.street}
              onChange={(e) => update('street', e.target.value)}
              placeholder={t3(language, 'Rue de Rivoli', 'Rivoli Street', 'Calle de Rivoli')}
              className="h-11 rounded-xl"
              aria-invalid={!!errors.street}
            />
            {errors.street && <p className="text-[13px] text-destructive">{errors.street}</p>}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            {(() => {
              const postalOptional = POSTAL_OPTIONAL_COUNTRIES.has(data.country);
              return (
                <>
                  <Label htmlFor="qf-postal">
                    {t3(language, 'Code postal', 'Postal code', 'Código postal')}
                    {postalOptional
                      ? ` (${t3(language, 'facultatif', 'optional', 'opcional')})`
                      : ' *'}
                  </Label>
                  <Input
                    id="qf-postal"
                    required={!postalOptional}
                    autoComplete="postal-code"
                    value={data.postalCode}
                    onChange={(e) => update('postalCode', e.target.value)}
                    placeholder="00000"
                    className="h-11 rounded-xl"
                    aria-invalid={!!errors.postalCode}
                  />
                </>
              );
            })()}

            {errors.postalCode && <p className="text-[13px] text-destructive">{errors.postalCode}</p>}
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="qf-city">{t3(language, 'Ville', 'City', 'Ciudad')} *</Label>
            <Input
              id="qf-city"
              required
              autoComplete="address-level2"
              value={data.city}
              onChange={(e) => update('city', e.target.value)}
              placeholder={t3(language, 'Paris', 'Paris', 'París')}
              className="h-11 rounded-xl"
              aria-invalid={!!errors.city}
            />
            {errors.city && <p className="text-[13px] text-destructive">{errors.city}</p>}
          </div>
        </div>



        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label htmlFor="qf-role">{t3(language, 'Votre poste (optionnel)', 'Your role (optional)', 'Su cargo (opcional)')}</Label>
            <Input
              id="qf-role"
              autoComplete="organization-title"
              value={data.role}
              onChange={(e) => update('role', e.target.value)}
              placeholder={t3(language, 'Fondateur, CMO, Acheteur...', 'Founder, CMO, Buyer...', 'Fundador, CMO, Comprador...')}
              className="h-11 rounded-xl"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="qf-phone">{t3(language, 'Téléphone (optionnel)', 'Phone (optional)', 'Teléfono (opcional)')}</Label>
            <Input
              id="qf-phone"
              type="tel"
              autoComplete="tel"
              value={data.phone}
              onChange={(e) => update('phone', e.target.value)}
              placeholder="+33 6 12 34 56 78"
              className="h-11 rounded-xl"
            />
            <p className="flex items-start gap-1.5 text-[11px] text-muted-foreground">
              <Truck className="w-3 h-3 mt-0.5 shrink-0" />
              {t3(
                language,
                'Demandé par DHL et FedEx pour la livraison internationale',
                'Required by DHL and FedEx for international delivery',
                'Requerido por DHL y FedEx para la entrega internacional'
              )}
            </p>
          </div>
        </div>

        {/* 17/10/2026 : 4 marques testeuses sur 5 voulaient dire leur projet (volumes, format des flacons, canaux de vente) */}
        <div className="space-y-1.5">
          <Label htmlFor="qf-message">
            {t3(language, 'Votre projet en une phrase', 'Your project in one sentence', 'Su proyecto en una frase')}{' '}
            <span className="font-normal text-muted-foreground">{t3(language, '(facultatif)', '(optional)', '(opcional)')}</span>
          </Label>
          <Textarea
            id="qf-message"
            rows={3}
            maxLength={1000}
            value={data.message}
            onChange={(e) => update('message', e.target.value)}
            placeholder={t3(
              language,
              'Ex. : format de vos flacons, pays de vente, volumes envisagés, calendrier',
              'E.g. your bottle sizes (10 ml droppers…), markets (UK, US…), volumes, timing',
              'Ej.: formato de sus frascos, países de venta, volúmenes previstos, calendario'
            )}
            className="rounded-xl"
          />
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full h-12 text-base rounded-xl text-white"
          style={{ background: '#B17743' }}
        >
          {isSubmitting
            ? t3(language, 'Envoi…', 'Sending…', 'Enviando…')
            : t3(language, "Confirmer l'envoi", 'Confirm shipping', 'Confirmar el envío')}
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </form>
    );
  }

  // step === 1
  return (
    <form onSubmit={handleStep1Submit} className="space-y-6" noValidate>
      <div className="text-center mb-2">
        <span className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-full" style={{ background: 'hsl(28 45% 48% / 0.12)', color: 'hsl(28 45% 38%)' }}>
          <Gift className="w-3.5 h-3.5" />
          {t3(language, 'Échantillon gratuit · Étape 1/2', 'Free sample · Step 1/2', 'Muestra gratuita · Paso 1/2')}
        </span>
        <h3 className="text-2xl md:text-3xl font-bold text-foreground mt-4">
          {t3(language, 'Recevez votre échantillon Tolia gratuit', 'Get your free Tolia sample', 'Reciba su muestra Tolia gratis')}
        </h3>
        <p className="text-sm text-muted-foreground mt-2">
          {t3(
            language,
            "Trois informations pour commencer. Ensuite : l'adresse de livraison et, si vous le souhaitez, quelques mots sur votre projet.",
            'Three details to start with. Then: the delivery address and, if you like, a few words about your project.',
            'Tres datos para empezar. Después: la dirección de envío y, si lo desea, unas palabras sobre su proyecto.'
          )}
        </p>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="qf-email">{t3(language, 'Email professionnel', 'Work email', 'Email profesional')} *</Label>
        <Input
          ref={emailInputRef}
          id="qf-email"
          type="email"
          required
          autoComplete="email"
          inputMode="email"
          autoCapitalize="none"
          spellCheck={false}
          value={data.email}
          onChange={(e) => {
            const v = e.target.value;
            // le site web suit l'email tant que le visiteur ne l'a pas modifié lui-même
            setData((prev) => {
              const d = domainFromEmail(v);
              const next = { ...prev, email: v };
              if (d && (siteAuto.current || !prev.website.trim())) { next.website = d; siteAuto.current = true; }
              return next;
            });
            setErrors((prev) => ({ ...prev, email: undefined, website: undefined }));
          }}
          onFocus={handleFormStart}
          placeholder={t3(language, 'prenom@votremarque.com', 'name@yourbrand.com', 'nombre@suempresa.es')}
          className="h-11 rounded-xl"
          aria-invalid={!!errors.email}
        />
        {errors.email && <p className="text-[13px] text-destructive">{errors.email}</p>}
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="qf-name">{t3(language, 'Prénom et nom', 'Full name', 'Nombre y apellidos')} *</Label>
          <Input
            id="qf-name"
            required
            autoComplete="name"
            value={data.name}
            onChange={(e) => update('name', e.target.value)}
            onFocus={handleFormStart}
            placeholder={t3(language, 'Prénom Nom', 'First and last name', 'Nombre y apellidos')}
            className="h-11 rounded-xl"
            aria-invalid={!!errors.name}
          />
          {errors.name && <p className="text-[13px] text-destructive">{errors.name}</p>}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="qf-company">{t3(language, 'Société', 'Company', 'Empresa')} *</Label>
          <Input
            id="qf-company"
            required
            autoComplete="organization"
            value={data.company}
            onChange={(e) => update('company', e.target.value)}
            onFocus={handleFormStart}
            placeholder={t3(language, 'Nom de votre société', 'Your company name', 'Nombre de su empresa')}
            className="h-11 rounded-xl"
            aria-invalid={!!errors.company}
          />
          {errors.company && <p className="text-[13px] text-destructive">{errors.company}</p>}
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="qf-website">
          {t3(language, 'Site web de la société', 'Company website', 'Sitio web de la empresa')}{' '}
          <span className="font-normal text-muted-foreground">{t3(language, '(facultatif)', '(optional)', '(opcional)')}</span>
        </Label>
        <Input
          id="qf-website"
          inputMode="url"
          autoComplete="url"
          autoCapitalize="none"
          spellCheck={false}
          value={data.website}
          onChange={(e) => { siteAuto.current = false; update('website', e.target.value); }}
          onFocus={handleFormStart}
          placeholder={t3(language, 'votremarque.com', 'yourbrand.com', 'suempresa.es')}
          className="h-11 rounded-xl"
          aria-invalid={!!errors.website}
        />
        {errors.website && <p className="text-[13px] text-destructive">{errors.website}</p>}
        {!errors.website && siteAuto.current && data.website && (
          <p className="text-[12px] text-muted-foreground">
            {t3(language, 'Rempli à partir de votre email : modifiez-le si besoin.', 'Filled in from your email: change it if needed.', 'Rellenado a partir de su email: modifíquelo si es necesario.')}
          </p>
        )}
      </div>

      {/* Optional qualification */}
      <div className="p-5 rounded-2xl border border-border/60 bg-muted/30 space-y-3">
        <p className="text-sm font-medium text-foreground">
          {t3(
            language,
            'Vous envisagez (facultatif)',
            'What are you considering? (optional)',
            '¿Qué le interesa? (opcional)'
          )}
        </p>
        <div className="grid gap-2">
          {projectOptions.map((opt) => {
            const active = data.projectType === opt.value;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => update('projectType', opt.value)}
                className={`flex items-start gap-3 p-3 rounded-xl border text-left transition-all ${
                  active ? 'border-primary bg-primary/5 ring-1 ring-primary' : 'border-border hover:border-primary/40 bg-card'
                }`}
              >
                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 ${active ? 'border-primary' : 'border-muted-foreground/40'}`}>
                  {active && <div className="w-2 h-2 rounded-full bg-primary" />}
                </div>
                <div>
                  <span className="text-sm font-medium text-foreground">{opt.label}</span>
                  {opt.sub && <p className="text-xs text-muted-foreground mt-0.5">{opt.sub}</p>}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full h-12 text-base rounded-xl text-white"
        style={{ background: '#B17743' }}
      >
        {isSubmitting
          ? t3(language, 'Envoi…', 'Sending…', 'Enviando…')
          : t3(language, 'Continuer : adresse de livraison', 'Continue: delivery address', 'Continuar: dirección de envío')}
        <ArrowRight className="w-5 h-5 ml-2" />
      </Button>

      {/* téléphone : une garantie par ligne (les points de séparation ne pendent plus en bout de ligne) */}
      <div className="flex flex-col items-center gap-1 text-[12px] text-muted-foreground sm:flex-row sm:flex-wrap sm:justify-center sm:gap-x-5 sm:gap-y-1.5">
        <span className="inline-flex items-center gap-1.5">
          <Package className="w-3.5 h-3.5" />
          {t3(language, 'Expédié sous 5 jours ouvrés', 'Ships in 5 business days', 'Envío en 5 días hábiles')}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5" />
          {t3(language, 'Conçu en France', 'Designed in France', 'Diseñado en Francia')}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Lock className="w-3.5 h-3.5" />
          {t3(language, 'Vos données restent privées', 'Your data stays private', 'Sus datos permanecen privados')}
        </span>
      </div>
    </form>
  );
};

export default QualificationForm;
