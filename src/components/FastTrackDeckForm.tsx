import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowRight, Mail, CheckCircle2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { t3 } from '@/lib/t3';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

const FastTrackDeckForm: React.FC = () => {
  const { language } = useLanguage();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    if (window.gtag) {
      window.gtag('event', 'fast_track_submit', { form_id: 'deck_request' });
    }

    setIsSubmitting(true);
    try {
      await supabase.functions.invoke('send-contact-form', {
        body: {
          email,
          name: email.split('@')[0],
          company: 'N/A',
          segment: 'deck-request',
        },
      });
      setIsSubmitted(true);
      toast({
        title: t3(language, 'Présentation envoyée !', 'Deck sent!', '¡Presentación enviada!'),
        description: t3(
          language,
          'Vérifiez votre boîte de réception (et vos spams).',
          'Check your inbox (and spam folder).',
          'Revise su bandeja de entrada (y la carpeta de spam).'
        ),
      });
    } catch {
      toast({
        title: t3(language, 'Erreur', 'Error', 'Error'),
        description: t3(language, 'Veuillez réessayer.', 'Please try again.', 'Por favor, inténtelo de nuevo.'),
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6 md:p-8 text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4">
          <CheckCircle2 className="w-6 h-6" />
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">
          {t3(language, 'C’est parti !', 'On its way!', '¡En camino!')}
        </h3>
        <p className="text-sm text-muted-foreground">
          {t3(
            language,
            'La présentation vous a été envoyée par email. Vérifiez vos spams si nécessaire.',
            'The deck has been emailed to you. Check your spam folder if needed.',
            'La presentación ha sido enviada por email. Revise su carpeta de spam si es necesario.'
          )}
        </p>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border/60 rounded-2xl p-6 md:p-8 shadow-sm">
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary mb-3">
          <Mail className="w-5 h-5" />
        </div>
        <h3 className="text-lg font-semibold text-foreground">
          {t3(language, 'Recevoir la présentation', 'Just send me the deck', 'Recibir la presentación')}
        </h3>
        <p className="text-sm text-muted-foreground mt-1">
          {t3(
            language,
            'Un email, un clic. Le deck Tolia directement dans votre boîte de réception.',
            'One email, one click. The Tolia deck straight to your inbox.',
            'Un email, un clic. El deck de Tolia directamente en su bandeja de entrada.'
          )}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1">
          <Label htmlFor="deck-email" className="sr-only">
            {t3(language, 'Email professionnel', 'Professional email', 'Email profesional')}
          </Label>
          <Input
            id="deck-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t3(
              language,
              'votre.email@entreprise.com',
              'your.email@company.com',
              'su.email@empresa.com'
            )}
            className="h-12 rounded-xl"
          />
        </div>
        <Button
          type="submit"
          disabled={isSubmitting}
          className="h-12 px-6 bg-primary hover:bg-primary/90 rounded-xl whitespace-nowrap"
        >
          {isSubmitting
            ? t3(language, 'Envoi…', 'Sending…', 'Enviando…')
            : t3(language, 'Recevoir maintenant', 'Get it now', 'Recibir ahora')}
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </form>
    </div>
  );
};

export default FastTrackDeckForm;
