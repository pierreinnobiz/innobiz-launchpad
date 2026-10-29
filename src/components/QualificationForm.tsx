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
import { calendlyUrl } from '@/lib/links';
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

// Noms des pays affichés dans la langue du visiteur (29/10/2026 : la liste s'affichait en anglais sur les pages française et
// espagnole). La valeur enregistrée et envoyée au CRM reste le nom anglais ci-dessus (POSTAL_OPTIONAL_COUNTRIES s'en sert).
const COUNTRY_NAMES: Record<string, [fr: string, es: string]> = {
  'France': ['France', 'Francia'],
  'Belgium': ['Belgique', 'Bélgica'],
  'Switzerland': ['Suisse', 'Suiza'],
  'Luxembourg': ['Luxembourg', 'Luxemburgo'],
  'Germany': ['Allemagne', 'Alemania'],
  'Netherlands': ['Pays-Bas', 'Países Bajos'],
  'Spain': ['Espagne', 'España'],
  'Portugal': ['Portugal', 'Portugal'],
  'Italy': ['Italie', 'Italia'],
  'United Kingdom': ['Royaume-Uni', 'Reino Unido'],
  'Ireland': ['Irlande', 'Irlanda'],
  'Austria': ['Autriche', 'Austria'],
  'Denmark': ['Danemark', 'Dinamarca'],
  'Sweden': ['Suède', 'Suecia'],
  'Norway': ['Norvège', 'Noruega'],
  'Finland': ['Finlande', 'Finlandia'],
  'Poland': ['Pologne', 'Polonia'],
  'Czech Republic': ['République tchèque', 'República Checa'],
  'United States': ['États-Unis', 'Estados Unidos'],
  'Canada': ['Canada', 'Canadá'],
  'Mexico': ['Mexique', 'México'],
  'Brazil': ['Brésil', 'Brasil'],
  'Argentina': ['Argentine', 'Argentina'],
  'United Arab Emirates': ['Émirats arabes unis', 'Emiratos Árabes Unidos'],
  'Saudi Arabia': ['Arabie saoudite', 'Arabia Saudí'],
  'Qatar': ['Qatar', 'Catar'],
  'Kuwait': ['Koweït', 'Kuwait'],
  'Bahrain': ['Bahreïn', 'Baréin'],
  'Japan': ['Japon', 'Japón'],
  'South Korea': ['Corée du Sud', 'Corea del Sur'],
  'China': ['Chine', 'China'],
  'Hong Kong': ['Hong Kong', 'Hong Kong'],
  'Singapore': ['Singapour', 'Singapur'],
  'Australia': ['Australie', 'Australia'],
  'New Zealand': ['Nouvelle-Zélande', 'Nueva Zelanda'],
  'Morocco': ['Maroc', 'Marruecos'],
  'Tunisia': ['Tunisie', 'Túnez'],
  'South Africa': ['Afrique du Sud', 'Sudáfrica'],
  'Other': ['Autre pays', 'Otro país'],
};
const countryLabel = (c: string, language: string) =>
  language === 'en' ? c : (COUNTRY_NAMES[c]?.[language === 'es' ? 1 : 0] ?? c);

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

// identifiant du champ à rendre actif quand il est en erreur (accessibilité, 22/10/2026)
const FIELD_ID: Partial<Record<keyof FormState, string>> = {
  email: 'qf-email', name: 'qf-name', company: 'qf-company', website: 'qf-website',
  country: 'qf-country-2', street: 'qf-street', postalCode: 'qf-postal', city: 'qf-city',
};
const focusFirstError = (errs: Partial<Record<keyof FormState, string>>) => {
  const first = (Object.keys(errs) as (keyof FormState)[])[0];
  const id = first && FIELD_ID[first];
  if (id) window.setTimeout(() => document.getElementById(id)?.focus(), 0);
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
  // Anti-spam invisible (21/10/2026) : un champ caché que seuls les robots remplissent, et un délai minimum avant l'envoi.
  // Un robot détecté voit le même parcours (étape 2 puis « merci ») mais rien n'est envoyé.
  const piegeRef = useRef<HTMLInputElement>(null);
  const debutRef = useRef(Date.now());
  const robotRef = useRef(false);
  const estRobot = () => (piegeRef.current?.value || '').trim() !== '' || Date.now() - debutRef.current < 1500;
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  // 22/10/2026 : si le serveur ne répond pas, on reste sur l'étape et on le dit (avant : « merci » affiché et demande perdue)
  const [sendError, setSendError] = useState(false);
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
    focusFirstError(next);
    return Object.keys(next).length === 0;
  };

  const validateStep2 = (): boolean => {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (!data.country) next.country = requiredMsg;

    const street = data.street.trim();
    if (!street) {
      next.street = t3(
        language,
        "Merci d’indiquer votre adresse",
        'Please enter your street address',
        'Por favor, indique su dirección'
      );
    } else if (street.length < 5) {
      next.street = t3(
        language,
        "L’adresse doit comporter au moins 5 caractères",
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
          'Merci d’indiquer votre code postal',
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
        'Merci d’indiquer votre ville',
        'Please enter your city',
        'Por favor, indique su ciudad'
      );
    } else if (city.length < 2) {
      next.city = t3(language, 'Ville invalide', 'Invalid city', 'Ciudad no válida');
    }


    setErrors(next);
    focusFirstError(next);
    return Object.keys(next).length === 0;
  };

  const handleStep1Submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep1()) return;
    if (robotRef.current || estRobot()) { robotRef.current = true; setStep(2); return; }
    setIsSubmitting(true);
    setSendError(false);

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
          hp: piegeRef.current?.value || '',
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
        intent,
        ...utms,
      });
      window.gtag?.('event', 'sample_requested', {
        intent,
        ...utms,
      });
    }

    setIsSubmitting(false);
    if (!leadSaved) { setSendError(true); return; }
    setStep(2);
  };

  const handleStep2Submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep2()) return;
    if (robotRef.current) { setStep(3); return; } // robot détecté à l'étape 1 : faux « merci », rien n'est envoyé
    setIsSubmitting(true);
    setSendError(false);

    const street = data.street.trim();
    const postal = data.postalCode.trim();
    const city = data.city.trim();
    const composedAddress = postal
      ? `${street}\n${postal} ${city}`
      : `${street}\n${city}`;


    let ok = false;
    try {
      const { error } = await supabase.functions.invoke('send-qualification-form', {
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
          lang: language,
        },
      });
      if (error) throw error;
      ok = true;
    } catch (err) {
      console.error('Shipping submit error (step 2):', err);
    }
    setIsSubmitting(false);
    if (!ok) { setSendError(true); return; }
    // la vraie fin de la demande : adresse de livraison confirmée (22/10/2026)
    window.gtag?.('event', 'sample_address_confirmed', {
      form_id: 'sample_request_main',
      intent: intentForGtag(data.projectType),
      ...getUtmParams(),
    });
    setStep(3);
  };

  const sendErrorBox = sendError ? (
    <p role="alert" className="rounded-xl border border-destructive/40 bg-destructive/5 px-4 py-3 text-sm text-foreground">
      {t3(
        language,
        "L’envoi n’a pas fonctionné. Vérifiez votre connexion et cliquez à nouveau ; si le problème continue, écrivez-nous à contact@innobiz.fr.",
        "Your request couldn’t be sent. Please check your connection and try again; if the problem persists, email us at contact@innobiz.fr.",
        'El envío no ha funcionado. Compruebe su conexión y vuelva a hacer clic; si el problema continúa, escríbanos a contact@innobiz.fr.'
      )}
    </p>
  ) : null;

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
            "Suivi par email à l’adresse renseignée.",
            'Track it via the email confirmation we just sent you.',
            'Seguimiento por email a la dirección indicada.'
          )}
        </p>
        {/* Facultatif : proposé après la demande, pour ceux qui préfèrent en parler. L'échantillon part de toute façon. */}
        <div className="mt-8 border-t border-border/60 pt-6 max-w-md mx-auto">
          <p className="text-sm text-muted-foreground">
            {t3(
              language,
              "Envie d’en parler ? 30 minutes avec Simon Desbuisson pour confirmer votre adresse, voir Tolia en direct et vérifier qu’il convient à votre gamme.",
              'Prefer to talk it through? 30 minutes with Simon Desbuisson to confirm your address, see Tolia live and check it fits your range.',
              '¿Prefiere hablarlo? 30 minutos con Simon Desbuisson para confirmar su dirección, ver Tolia en directo y comprobar que encaja con su gama.'
            )}
          </p>
          <a
            href={calendlyUrl('sample_thanks', language)}
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
      sub: t3(language, 'dès 500 pièces, expédition sous 72 h si en stock', 'from 500 units, ships within 72 h if in stock', 'desde 500 unidades, envío en 72 h si hay stock'),
    },
    {
      value: 'white_label',
      label: t3(language, 'Production en marque blanche', 'White-label production', 'Producción en marca blanca'),
      sub: t3(language, 'à partir de 3 000 pièces, personnalisation complète', 'from 3,000 units, full customisation', 'desde 3.000 unidades, personalización completa'),
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
              <SelectTrigger id="qf-country-2" className="h-11 rounded-xl" aria-invalid={!!errors.country} aria-describedby={errors.country ? 'qf-err-country' : undefined} aria-required="true">
                <SelectValue placeholder={t3(language, 'Sélectionner', 'Select', 'Seleccionar')} />
              </SelectTrigger>
              <SelectContent className="bg-card max-h-72">
                {COUNTRIES.map((c) => (
                  <SelectItem key={c} value={c}>{countryLabel(c, language)}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.country && <p id="qf-err-country" role="alert" className="text-[13px] text-destructive">{errors.country}</p>}
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="qf-street">{t3(language, 'Adresse', 'Street address', 'Dirección')} *</Label>
            <Input
              id="qf-street"
              required
              autoComplete="address-line1"
              value={data.street}
              onChange={(e) => update('street', e.target.value)}
              placeholder={t3(language, 'Rue de Rivoli', '10 High Street', 'Calle Mayor')}
              className="h-11 rounded-xl"
              aria-invalid={!!errors.street}
            aria-describedby={errors.street ? 'qf-err-street' : undefined}
            />
            {errors.street && <p id="qf-err-street" role="alert" className="text-[13px] text-destructive">{errors.street}</p>}
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
                  aria-describedby={errors.postalCode ? 'qf-err-postalCode' : undefined}
                  />
                </>
              );
            })()}

            {errors.postalCode && <p id="qf-err-postalCode" role="alert" className="text-[13px] text-destructive">{errors.postalCode}</p>}
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="qf-city">{t3(language, 'Ville', 'City', 'Ciudad')} *</Label>
            <Input
              id="qf-city"
              required
              autoComplete="address-level2"
              value={data.city}
              onChange={(e) => update('city', e.target.value)}
              placeholder={t3(language, 'Paris', 'Paris', 'Madrid')}
              className="h-11 rounded-xl"
              aria-invalid={!!errors.city}
            aria-describedby={errors.city ? 'qf-err-city' : undefined}
            />
            {errors.city && <p id="qf-err-city" role="alert" className="text-[13px] text-destructive">{errors.city}</p>}
          </div>
        </div>



        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label htmlFor="qf-role">{t3(language, 'Votre poste (facultatif)', 'Your role (optional)', 'Su cargo (opcional)')}</Label>
            <Input
              id="qf-role"
              autoComplete="organization-title"
              value={data.role}
              onChange={(e) => update('role', e.target.value)}
              placeholder={t3(language, 'Fondateur, CMO, acheteur…', 'Founder, CMO, Buyer…', 'Fundador, CMO, Comprador...')}
              className="h-11 rounded-xl"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="qf-phone">{t3(language, 'Téléphone (facultatif)', 'Phone (optional)', 'Teléfono (opcional)')}</Label>
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
                'Lo piden DHL y FedEx para los envíos internacionales'
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

        {sendErrorBox}
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full h-12 text-base rounded-xl text-white"
          style={{ background: 'hsl(28 52% 36%)' }}
        >
          {isSubmitting
            ? t3(language, 'Envoi…', 'Sending…', 'Enviando…')
            : t3(language, "Confirmer l’envoi", 'Confirm and send', 'Confirmar el envío')}
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </form>
    );
  }

  // step === 1
  return (
    <form onSubmit={handleStep1Submit} className="space-y-6" noValidate>
      {/* piège anti-robots : invisible, hors écran, ignoré par le clavier et les lecteurs d'écran */}
      <div aria-hidden="true" style={{ position: 'absolute', left: '-10000px', top: 'auto', width: 1, height: 1, overflow: 'hidden' }}>
        <label htmlFor="qf-confirm-url">Ne pas remplir</label>
        <input id="qf-confirm-url" ref={piegeRef} type="text" name="confirm_url_b" tabIndex={-1} autoComplete="off" defaultValue="" />
      </div>
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
            "Trois informations pour commencer. Ensuite : l’adresse de livraison et, si vous le souhaitez, quelques mots sur votre projet.",
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
          placeholder={t3(language, 'prenom@votremarque.com', 'name@yourbrand.com', 'nombre@sumarca.es')}
          className="h-11 rounded-xl"
          aria-invalid={!!errors.email}
        aria-describedby={errors.email ? 'qf-err-email' : undefined}
        />
        {errors.email && <p id="qf-err-email" role="alert" className="text-[13px] text-destructive">{errors.email}</p>}
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
          aria-describedby={errors.name ? 'qf-err-name' : undefined}
          />
          {errors.name && <p id="qf-err-name" role="alert" className="text-[13px] text-destructive">{errors.name}</p>}
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
          aria-describedby={errors.company ? 'qf-err-company' : undefined}
          />
          {errors.company && <p id="qf-err-company" role="alert" className="text-[13px] text-destructive">{errors.company}</p>}
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
          placeholder={t3(language, 'votremarque.com', 'yourbrand.com', 'sumarca.es')}
          className="h-11 rounded-xl"
          aria-invalid={!!errors.website}
        aria-describedby={errors.website ? 'qf-err-website' : undefined}
        />
        {errors.website && <p id="qf-err-website" role="alert" className="text-[13px] text-destructive">{errors.website}</p>}
        {!errors.website && siteAuto.current && data.website && (
          <p className="text-[12px] text-muted-foreground">
            {t3(language, 'Rempli à partir de votre email : modifiez-le si besoin.', 'Filled in from your email: change it if needed.', 'Rellenado a partir de su email: modifíquelo si es necesario.')}
          </p>
        )}
      </div>

      {/* Optional qualification */}
      <div className="p-5 rounded-2xl border border-border/60 bg-muted/30 space-y-3">
        <p id="qf-project-label" className="text-sm font-medium text-foreground">
          {t3(
            language,
            'Vous envisagez (facultatif)',
            'What are you considering? (optional)',
            '¿Qué le interesa? (opcional)'
          )}
        </p>
        <div className="grid gap-2" role="radiogroup" aria-labelledby="qf-project-label">
          {projectOptions.map((opt) => {
            const active = data.projectType === opt.value;
            return (
              <button
                key={opt.value}
                type="button"
                role="radio"
                aria-checked={active}
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

      {sendErrorBox}
      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full h-12 text-base rounded-xl text-white"
        style={{ background: 'hsl(28 52% 36%)' }}
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
          {t3(language, 'Expédié sous 5 jours ouvrés', 'Ships within 5 working days', 'Envío en 5 días hábiles')}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5" />
          {t3(language, 'Conçu en France', 'Designed in France', 'Diseñado en Francia')}
        </span>
      </div>
      {/* 22/10/2026 (point F2) : information au moment de la collecte, avec lien vers la politique de confidentialité */}
      <p className="flex items-start justify-center gap-1.5 text-center text-[12px] text-muted-foreground">
        <Lock className="w-3.5 h-3.5 mt-0.5 shrink-0" aria-hidden="true" />
        <span>
          {t3(
            language,
            "Vos données servent uniquement à vous envoyer l’échantillon et à vous recontacter.",
            'Your details are only used to send your sample and get back to you.',
            'Sus datos solo se usan para enviarle la muestra y volver a contactarle.'
          )}{' '}
          <a href="/privacy" className="underline underline-offset-2 hover:text-foreground">
            {t3(language, 'En savoir plus', 'Learn more', 'Más información')}
          </a>
        </span>
      </p>
    </form>
  );
};

export default QualificationForm;
