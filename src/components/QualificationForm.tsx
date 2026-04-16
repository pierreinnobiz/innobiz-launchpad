import React, { useState, useCallback, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowRight, ArrowLeft, CheckCircle2, Shield, Sparkles, Check, Calendar } from 'lucide-react';

interface FormData {
  company: string;
  website: string;
  country: string;
  market: string;
  channels: string[];
  salesRange: string;
  timing: string;
  objective: string;
  message: string;
}

const QualificationForm: React.FC = () => {
  const { language } = useLanguage();
  const [step, setStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    company: '',
    website: '',
    country: '',
    market: '',
    channels: [],
    salesRange: '',
    timing: '',
    objective: '',
    message: '',
  });

  const totalSteps = 4;

  const updateField = useCallback((field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  }, []);

  const toggleChannel = useCallback((channel: string) => {
    setFormData(prev => {
      const isSelected = prev.channels.includes(channel);
      return {
        ...prev,
        channels: isSelected 
          ? prev.channels.filter(c => c !== channel)
          : [...prev.channels, channel]
      };
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { supabase } = await import('@/integrations/supabase/client');
      const { error } = await supabase.functions.invoke('send-qualification-form', {
        body: formData,
      });
      if (error) console.error('Qualification form email error:', error);
    } catch (err) {
      console.error('Qualification form submit error:', err);
    }
    setIsSubmitted(true);
  };

  const canProceed = () => {
    switch (step) {
      case 1: return formData.company.trim() && formData.country.trim();
      case 2: return formData.market;
      case 3: return formData.salesRange && formData.timing;
      case 4: return formData.objective;
      default: return true;
    }
  };

  const stepInfo = {
    1: {
      title: language === 'fr' ? 'Prise de contact' : 'Contact details',
      subtitle: language === 'fr' ? 'Présentons-nous rapidement.' : "Let's get to know each other."
    },
    2: {
      title: language === 'fr' ? 'Votre marché' : 'Your market',
      subtitle: language === 'fr' ? 'Pas de bonne ou mauvaise réponse, on veut juste comprendre votre contexte.' : 'No right or wrong answer, we just want to understand your context.'
    },
    3: {
      title: language === 'fr' ? 'Potentiel projet' : 'Project potential',
      subtitle: language === 'fr' ? 'Ces infos nous aident uniquement à préparer une discussion pertinente.' : 'This helps us prepare a relevant discussion.'
    },
    4: {
      title: language === 'fr' ? 'Votre objectif' : 'Your objective',
      subtitle: language === 'fr' ? 'Pas besoin de brief formel. Une idée générale suffit.' : 'No formal brief needed, a general idea is enough.'
    }
  };

  const salesRanges = [
    { value: '<100k', label: language === 'fr' ? 'Moins de 100 000 €' : 'Less than €100,000' },
    { value: '100k-500k', label: language === 'fr' ? '100 000 € – 500 000 €' : '€100,000 – €500,000' },
    { value: '500k-1m', label: language === 'fr' ? '500 000 € – 1 M€' : '€500,000 – €1M' },
    { value: '1m-5m', label: language === 'fr' ? '1 M€ – 5 M€' : '€1M – €5M' },
    { value: '>5m', label: language === 'fr' ? 'Plus de 5 M€' : 'More than €5M' },
    { value: 'unknown', label: language === 'fr' ? 'Je ne sais pas encore' : "I don't know yet" },
  ];

  const timingOptions = [
    { value: '0-3', label: language === 'fr' ? 'Dans les 3 prochains mois' : 'Within 3 months' },
    { value: '3-6', label: language === 'fr' ? 'Dans 3 à 6 mois' : 'In 3 to 6 months' },
    { value: '6-12', label: language === 'fr' ? 'Dans 6 à 12 mois' : 'In 6 to 12 months' },
    { value: 'exploring', label: language === 'fr' ? "J'explore les options" : "I'm exploring options" },
  ];

  const objectives = [
    { value: 'increase-sales', label: language === 'fr' ? 'Augmenter les ventes de consommables' : 'Increase consumable sales' },
    { value: 'new-product', label: language === 'fr' ? 'Lancer un nouveau produit diffuseur' : 'Launch a new diffuser product' },
    { value: 'differentiate', label: language === 'fr' ? 'Me différencier de la concurrence' : 'Differentiate from competitors' },
    { value: 'premium-positioning', label: language === 'fr' ? 'Monter en gamme' : 'Move upmarket' },
    { value: 'replace-existing', label: language === 'fr' ? 'Remplacer une solution existante' : 'Replace an existing solution' },
    { value: 'other', label: language === 'fr' ? 'Autre (précisez dans le message)' : 'Other (specify in message)' },
  ];

  const channelOptions = [
    { value: 'dtc', label: language === 'fr' ? 'Site e-commerce propre' : 'Own e-commerce website' },
    { value: 'retail', label: language === 'fr' ? 'Retail / Boutiques' : 'Retail / Stores' },
    { value: 'marketplaces', label: language === 'fr' ? 'Marketplaces (Amazon, etc.)' : 'Marketplaces (Amazon, etc.)' },
    { value: 'wholesale', label: language === 'fr' ? 'Distribution B2B' : 'B2B Distribution' },
    { value: 'spa-hotels', label: language === 'fr' ? 'Spas & Hôtellerie' : 'Spas & Hospitality' },
  ];

  const marketOptions = [
    { value: 'eo', label: language === 'fr' ? 'Huiles essentielles' : 'Essential Oils' },
    { value: 'hf', label: language === 'fr' ? "Parfums d'intérieur / Home fragrance" : 'Home Fragrance' },
    { value: 'both', label: language === 'fr' ? 'Les deux' : 'Both' },
    { value: 'other', label: language === 'fr' ? 'Autre (cosmétique, bien-être...)' : 'Other (cosmetics, wellness...)' },
  ];

  // Load Calendly widget script
  useEffect(() => {
    if (isSubmitted) {
      const script = document.createElement('script');
      script.src = 'https://assets.calendly.com/assets/external/widget.js';
      script.async = true;
      document.body.appendChild(script);
      
      return () => {
        document.body.removeChild(script);
      };
    }
  }, [isSubmitted]);

  // Success screen with Calendly
  if (isSubmitted) {
    return (
      <div className="text-center py-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-highlight/10 text-highlight mb-6">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-semibold text-foreground mb-4">
          {language === 'fr' ? "Parfait ! Plus qu'une étape." : 'Perfect! One last step.'}
        </h3>
        <p className="text-muted-foreground mb-6 max-w-md mx-auto">
          {language === 'fr'
            ? 'Sélectionnez un créneau de 45 minutes pour une démonstration personnalisée.'
            : 'Select a 45-minute slot for a personalised demonstration.'}
        </p>
        
        {/* Calendly inline widget */}
        <div 
          className="calendly-inline-widget rounded-2xl overflow-hidden border border-border" 
          data-url="https://calendly.com/pierreemmanuelthuretinnobiz?hide_gdpr_banner=1&primary_color=10b981"
          style={{ minWidth: '320px', height: '700px' }}
        />
        
        <p className="text-xs text-muted-foreground mt-6 max-w-sm mx-auto">
          {language === 'fr'
            ? "Un email de confirmation vous sera envoyé avec les détails de l'appel."
            : 'A confirmation email will be sent with call details.'}
        </p>
      </div>
    );
  }

  const currentStep = stepInfo[step as keyof typeof stepInfo];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Progress indicator */}
      <div className="flex items-center justify-center gap-2 mb-6">
        {[1, 2, 3, 4].map((s) => (
          <div
            key={s}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              s === step ? 'w-10 bg-primary' : s < step ? 'w-4 bg-primary/60' : 'w-4 bg-border'
            }`}
          />
        ))}
      </div>

      {/* Step header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 text-xs text-muted-foreground mb-2">
          <span className="bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">
            {step}/{totalSteps}
          </span>
          <span>•</span>
          <span>≈ 2 minutes</span>
        </div>
        <h3 className="text-xl font-semibold text-foreground mb-1">{currentStep.title}</h3>
        <p className="text-sm text-muted-foreground">{currentStep.subtitle}</p>
      </div>

      {/* Step 1: Contact */}
      {step === 1 && (
        <div className="space-y-5 animate-fade-in">
          <div className="space-y-2">
            <Label htmlFor="company">
              {language === 'fr' ? 'Nom de la marque / société' : 'Brand / Company name'} *
            </Label>
            <Input
              id="company"
              value={formData.company}
              onChange={(e) => updateField('company', e.target.value)}
              placeholder={language === 'fr' ? 'Ex: Ma Belle Marque' : 'Ex: My Beautiful Brand'}
              className="h-12"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="website">{language === 'fr' ? 'Site internet' : 'Website'}</Label>
            <Input
              id="website"
              type="url"
              value={formData.website}
              onChange={(e) => updateField('website', e.target.value)}
              placeholder="https://www.example.com"
              className="h-12"
            />
            <p className="text-xs text-muted-foreground">
              {language === 'fr' ? 'Facultatif, nous aide à mieux vous connaître' : 'Optional, helps us know you better'}
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="country">
              {language === 'fr' ? "Pays principal d'activité" : 'Primary country of operation'} *
            </Label>
            <Input
              id="country"
              value={formData.country}
              onChange={(e) => updateField('country', e.target.value)}
              placeholder={language === 'fr' ? 'France, Belgique, UAE...' : 'France, Belgium, UAE...'}
              className="h-12"
            />
          </div>

          <div className="flex items-start gap-2 p-3 bg-secondary/50 rounded-lg border border-border mt-4">
            <Shield className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
            <p className="text-xs text-muted-foreground">
              {language === 'fr'
                ? 'Vos informations restent strictement confidentielles et ne sont jamais partagées.'
                : 'Your information remains strictly confidential and is never shared.'}
            </p>
          </div>
        </div>
      )}

      {/* Step 2: Market */}
      {step === 2 && (
        <div className="space-y-5 animate-fade-in">
          <div className="space-y-2">
            <Label>{language === 'fr' ? 'Activité principale' : 'Main activity'} *</Label>
            <div className="grid grid-cols-1 gap-2">
              {marketOptions.map((m) => (
                <button
                  key={m.value}
                  type="button"
                  onClick={() => updateField('market', m.value)}
                  className={`flex items-center gap-3 p-4 rounded-xl border text-left transition-all ${
                    formData.market === m.value
                      ? 'border-primary bg-primary/5 ring-1 ring-primary'
                      : 'border-border hover:border-primary/40 hover:bg-secondary/50'
                  }`}
                >
                  <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${
                    formData.market === m.value ? 'border-primary' : 'border-muted-foreground/40'
                  }`}>
                    {formData.market === m.value && <div className="w-2 h-2 rounded-full bg-primary" />}
                  </div>
                  <span className="text-sm font-medium">{m.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <Label>
              {language === 'fr' ? 'Canaux de vente (plusieurs choix possibles)' : 'Sales channels (multiple choice)'}
            </Label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {channelOptions.map((channel) => {
                const isSelected = formData.channels.includes(channel.value);
                return (
                  <button
                    key={channel.value}
                    type="button"
                    onClick={() => toggleChannel(channel.value)}
                    className={`flex items-center gap-3 p-3 rounded-xl border text-left transition-all ${
                      isSelected
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-primary/40'
                    }`}
                  >
                    <div className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 transition-colors ${
                      isSelected ? 'bg-primary border-primary' : 'border-muted-foreground/40'
                    }`}>
                      {isSelected && <Check className="w-3 h-3 text-primary-foreground" />}
                    </div>
                    <span className="text-sm">{channel.label}</span>
                  </button>
                );
              })}
            </div>
            <p className="text-xs text-muted-foreground">
              {language === 'fr'
                ? 'Ça nous aide à calibrer les volumes, sans engagement de votre part.'
                : 'Helps us gauge volumes, no commitment from you.'}
            </p>
          </div>
        </div>
      )}

      {/* Step 3: Project potential */}
      {step === 3 && (
        <div className="space-y-5 animate-fade-in">
          <div className="space-y-2">
            <Label>
              {language === 'fr' ? 'Volume annuel de vente de consommables (estimé)' : 'Annual consumable sales volume (estimated)'} *
            </Label>
            <Select value={formData.salesRange} onValueChange={(v) => updateField('salesRange', v)}>
              <SelectTrigger className="h-12">
                <SelectValue placeholder={language === 'fr' ? 'Sélectionnez une fourchette' : 'Select a range'} />
              </SelectTrigger>
              <SelectContent>
                {salesRanges.map((range) => (
                  <SelectItem key={range.value} value={range.value}>
                    {range.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">
              {language === 'fr'
                ? 'Huiles essentielles, recharges, fragrances... tout ce que vos clients rachètent.'
                : 'Essential oils, refills, fragrances... anything your customers repurchase.'}
            </p>
          </div>

          <div className="space-y-2">
            <Label>{language === 'fr' ? 'Timing du projet' : 'Project timing'} *</Label>
            <div className="grid grid-cols-1 gap-2">
              {timingOptions.map((t) => (
                <button
                  key={t.value}
                  type="button"
                  onClick={() => updateField('timing', t.value)}
                  className={`flex items-center gap-3 p-4 rounded-xl border text-left transition-all ${
                    formData.timing === t.value
                      ? 'border-primary bg-primary/5 ring-1 ring-primary'
                      : 'border-border hover:border-primary/40 hover:bg-secondary/50'
                  }`}
                >
                  <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${
                    formData.timing === t.value ? 'border-primary' : 'border-muted-foreground/40'
                  }`}>
                    {formData.timing === t.value && <div className="w-2 h-2 rounded-full bg-primary" />}
                  </div>
                  <span className="text-sm font-medium">{t.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-start gap-2 p-3 bg-primary/5 rounded-lg border border-primary/20 mt-4">
            <Sparkles className="w-4 h-4 text-primary mt-0.5 shrink-0" />
            <p className="text-xs text-muted-foreground">
              {language === 'fr'
                ? 'Même si vous explorez encore, on peut vous montrer ce qui est possible.'
                : "Even if you're still exploring, we can show you what's possible."}
            </p>
          </div>
        </div>
      )}

      {/* Step 4: Objective */}
      {step === 4 && (
        <div className="space-y-5 animate-fade-in">
          <div className="space-y-2">
            <Label>{language === 'fr' ? 'Objectif principal du projet' : 'Main project objective'} *</Label>
            <div className="grid grid-cols-1 gap-2">
              {objectives.map((obj) => (
                <button
                  key={obj.value}
                  type="button"
                  onClick={() => updateField('objective', obj.value)}
                  className={`flex items-center gap-3 p-4 rounded-xl border text-left transition-all ${
                    formData.objective === obj.value
                      ? 'border-primary bg-primary/5 ring-1 ring-primary'
                      : 'border-border hover:border-primary/40 hover:bg-secondary/50'
                  }`}
                >
                  <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${
                    formData.objective === obj.value ? 'border-primary' : 'border-muted-foreground/40'
                  }`}>
                    {formData.objective === obj.value && <div className="w-2 h-2 rounded-full bg-primary" />}
                  </div>
                  <span className="text-sm font-medium">{obj.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">
              {language === 'fr' ? 'Un mot à nous dire ? (facultatif)' : 'Anything you want to share? (optional)'}
            </Label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={(e) => updateField('message', e.target.value)}
              placeholder={
                language === 'fr'
                  ? 'Contexte, questions, attentes particulières...'
                  : 'Context, questions, specific expectations...'
              }
              rows={3}
              className="resize-none"
            />
          </div>

          <div className="flex items-start gap-2 p-3 bg-secondary/50 rounded-lg border border-border mt-4">
            <Sparkles className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
            <p className="text-xs text-muted-foreground">
              {language === 'fr'
                ? 'Pas de brief formel nécessaire, on discute et on adapte ensemble.'
                : "No formal brief needed, we'll discuss and adapt together."}
            </p>
          </div>
        </div>
      )}

      {/* Navigation buttons */}
      <div className="flex gap-3 pt-4">
        {step > 1 && (
          <Button
            type="button"
            variant="outline"
            onClick={() => setStep(step - 1)}
            className="flex-1 h-12"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {language === 'fr' ? 'Retour' : 'Back'}
          </Button>
        )}
        {step < totalSteps ? (
          <Button
            type="button"
            onClick={() => setStep(step + 1)}
            disabled={!canProceed()}
            className="flex-1 h-12 bg-primary hover:bg-primary/90"
          >
            {language === 'fr' ? 'Continuer' : 'Continue'}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        ) : (
          <Button
            type="submit"
            disabled={!canProceed()}
            className="flex-1 h-12 bg-highlight hover:bg-highlight/90 text-highlight-foreground"
          >
            <Calendar className="w-4 h-4 mr-2" />
            {language === 'fr' ? 'Réserver ma démo' : 'Book my demo'}
          </Button>
        )}
      </div>
    </form>
  );
};

export default QualificationForm;
