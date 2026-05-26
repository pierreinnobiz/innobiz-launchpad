import React, { useState, useCallback, useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowRight, CheckCircle2, Gift, Truck, Package, ShieldCheck, Lock } from 'lucide-react';
import { t3 } from '@/lib/t3';
import { supabase } from '@/integrations/supabase/client';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

type ProjectType = 'stock_order' | 'white_label' | 'exploring';

interface FormState {
  name: string;
  company: string;
  email: string;
  country: string;
  address: string;
  role: string;
  phone: string;
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

const QualificationForm: React.FC = () => {
  const { language } = useLanguage();
  const formStartedRef = useRef(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [data, setData] = useState<FormState>({
    name: '',
    company: '',
    email: '',
    country: '',
    address: '',
    role: '',
    phone: '',
    projectType: 'exploring',
  });

  const update = useCallback(<K extends keyof FormState>(field: K, value: FormState[K]) => {
    setData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  }, []);

  const handleFormStart = () => {
    if (!formStartedRef.current) {
      formStartedRef.current = true;
      window.gtag?.('event', 'form_start', { form_id: 'sample_request_main' });
    }
  };

  const validate = (): boolean => {
    const next: Partial<Record<keyof FormState, string>> = {};
    const requiredMsg = t3(language, 'Ce champ est obligatoire', 'This field is required', 'Este campo es obligatorio');
    if (!data.name.trim()) next.name = requiredMsg;
    if (!data.company.trim()) next.company = requiredMsg;
    if (!data.email.trim()) next.email = requiredMsg;
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
      next.email = t3(language, 'Email invalide', 'Invalid email', 'Email no válido');
    if (!data.country) next.country = requiredMsg;
    if (!data.address.trim()) next.address = requiredMsg;
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const PROJECT_TYPE_TO_LABEL: Record<ProjectType, string> = {
    stock_order: 'Stock order',
    white_label: 'White-label production',
    exploring: 'Just exploring for now',
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);

    window.gtag?.('event', 'form_submit', {
      form_id: 'sample_request_main',
      project_type: data.projectType,
      country: data.country,
    });

    try {
      await supabase.functions.invoke('send-qualification-form', {
        body: {
          name: data.name,
          company: data.company,
          email: data.email,
          country: data.country,
          address: data.address,
          role: data.role,
          phone: data.phone,
          project_type: data.projectType,
          project_type_label: PROJECT_TYPE_TO_LABEL[data.projectType],
        },
      });
      setIsSubmitted(true);
    } catch (err) {
      console.error('Sample request submit error:', err);
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
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
      </div>
    );
  }

  const projectOptions: { value: ProjectType; label: string; sub: string }[] = [
    {
      value: 'stock_order',
      label: t3(language, 'Commande sur stock', 'Stock order', 'Pedido de stock'),
      sub: t3(language, 'à partir de 300 unités, expédition 72h', 'from 300 units, ships in 72h', 'desde 300 unidades, envío en 72h'),
    },
    {
      value: 'white_label',
      label: t3(language, 'Production marque blanche', 'White-label production', 'Producción marca blanca'),
      sub: t3(language, 'à partir de 3 000 unités, personnalisation complète', 'from 3,000 units, full customization', 'desde 3.000 unidades, personalización completa'),
    },
    {
      value: 'exploring',
      label: t3(language, "Simple découverte pour l'instant", 'Just exploring for now', 'Solo explorando por ahora'),
      sub: '',
    },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      {/* Header */}
      <div className="text-center mb-2">
        <span className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-full" style={{ background: 'hsl(28 45% 48% / 0.12)', color: 'hsl(28 45% 38%)' }}>
          <Gift className="w-3.5 h-3.5" />
          {t3(language, 'Échantillon gratuit', 'Free sample', 'Muestra gratis')}
        </span>
        <h3 className="text-2xl md:text-3xl font-bold text-foreground mt-4">
          {t3(language, 'Recevez votre échantillon Tolia gratuit', 'Get your free Tolia sample', 'Reciba su muestra Tolia gratis')}
        </h3>
        <p className="text-sm text-muted-foreground mt-2">
          {t3(
            language,
            'Expédié de France sous 5 jours ouvrés. Aucun appel requis.',
            'Ships from France within 5 business days. No call required first.',
            'Envío desde Francia en 5 días hábiles. No requiere llamada previa.'
          )}
        </p>
      </div>

      {/* Row 1: name + company */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="qf-name">{t3(language, 'Votre nom', 'Your name', 'Su nombre')} *</Label>
          <Input
            id="qf-name"
            required
            value={data.name}
            onChange={(e) => update('name', e.target.value)}
            onFocus={handleFormStart}
            placeholder={t3(language, 'Jeanne Dupont', 'Jane Doe', 'Juana Pérez')}
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
            value={data.company}
            onChange={(e) => update('company', e.target.value)}
            onFocus={handleFormStart}
            placeholder={t3(language, 'Acme Aromathérapie', 'Acme Aromatherapy', 'Acme Aromaterapia')}
            className="h-11 rounded-xl"
            aria-invalid={!!errors.company}
          />
          {errors.company && <p className="text-[13px] text-destructive">{errors.company}</p>}
        </div>
      </div>

      {/* Row 2: email full */}
      <div className="space-y-1.5">
        <Label htmlFor="qf-email">{t3(language, 'Email professionnel', 'Professional email', 'Email profesional')} *</Label>
        <Input
          id="qf-email"
          type="email"
          required
          value={data.email}
          onChange={(e) => update('email', e.target.value)}
          onFocus={handleFormStart}
          placeholder="jane.doe@company.com"
          className="h-11 rounded-xl"
          aria-invalid={!!errors.email}
        />
        {errors.email && <p className="text-[13px] text-destructive">{errors.email}</p>}
      </div>

      {/* Row 3: country (1fr) + address (2fr) */}
      <div className="grid sm:grid-cols-3 gap-4">
        <div className="space-y-1.5 sm:col-span-1">
          <Label htmlFor="qf-country">{t3(language, 'Pays', 'Country', 'País')} *</Label>
          <Select value={data.country} onValueChange={(v) => update('country', v)} required>
            <SelectTrigger id="qf-country" className="h-11 rounded-xl" aria-invalid={!!errors.country} aria-required="true">
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
        <div className="space-y-1.5 sm:col-span-2">
          <Label htmlFor="qf-address">{t3(language, 'Adresse de livraison', 'Shipping address', 'Dirección de envío')} *</Label>
          <Input
            id="qf-address"
            required
            value={data.address}
            onChange={(e) => update('address', e.target.value)}
            onFocus={handleFormStart}
            placeholder="42 Rue de Rivoli, 75001 Paris"
            className="h-11 rounded-xl"
            aria-invalid={!!errors.address}
          />
          {errors.address && <p className="text-[13px] text-destructive">{errors.address}</p>}
        </div>
      </div>

      {/* Row 4: role + phone */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="qf-role">{t3(language, 'Votre poste (optionnel)', 'Your role (optional)', 'Su cargo (opcional)')}</Label>
          <Input
            id="qf-role"
            value={data.role}
            onChange={(e) => update('role', e.target.value)}
            onFocus={handleFormStart}
            placeholder={t3(language, 'Fondateur, CMO, Acheteur...', 'Founder, CMO, Buyer...', 'Fundador, CMO, Comprador...')}
            className="h-11 rounded-xl"
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="qf-phone">{t3(language, 'Téléphone (optionnel)', 'Phone (optional)', 'Teléfono (opcional)')}</Label>
          <Input
            id="qf-phone"
            type="tel"
            value={data.phone}
            onChange={(e) => update('phone', e.target.value)}
            onFocus={handleFormStart}
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

      {/* Optional qualification */}
      <div className="p-5 rounded-2xl border border-border/60 bg-muted/30 space-y-3">
        <p className="text-sm font-medium text-foreground">
          {t3(
            language,
            "Je m'intéresse aussi à (optionnel, nous aide à préparer l'appel après réception de l'échantillon)",
            "I'm also exploring (optional, helps us tailor the call after you receive the sample)",
            'También me interesa (opcional, nos ayuda a preparar la llamada tras recibir la muestra)'
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

      {/* Submit */}
      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full h-12 text-base rounded-xl text-white"
        style={{ background: '#B17743' }}
      >
        {isSubmitting
          ? t3(language, 'Envoi…', 'Sending…', 'Enviando…')
          : t3(language, 'Envoyez-moi mon échantillon Tolia gratuit', 'Send me my free Tolia sample', 'Envíenme mi muestra Tolia gratis')}
        <ArrowRight className="w-5 h-5 ml-2" />
      </Button>

      {/* Triple reassurance */}
      <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[12px] text-muted-foreground">
        <span className="inline-flex items-center gap-1.5">
          <Package className="w-3.5 h-3.5" />
          {t3(language, 'Expédié sous 5 jours ouvrés', 'Ships in 5 business days', 'Envío en 5 días hábiles')}
        </span>
        <span aria-hidden="true">·</span>
        <span className="inline-flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5" />
          {t3(language, 'Fabriqué en France', 'Made in France', 'Hecho en Francia')}
        </span>
        <span aria-hidden="true">·</span>
        <span className="inline-flex items-center gap-1.5">
          <Lock className="w-3.5 h-3.5" />
          {t3(language, 'Vos données restent privées', 'Your data stays private', 'Sus datos permanecen privados')}
        </span>
      </div>
    </form>
  );
};

export default QualificationForm;
