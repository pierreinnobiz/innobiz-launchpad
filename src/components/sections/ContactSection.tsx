import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowRight, CheckCircle2, Clock, Shield, Users } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { trackCTAClick, trackEvent } from '@/lib/tracking';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/integrations/supabase/client';

const ContactSection: React.FC = () => {
  const { toast } = useToast();
  const { language } = useLanguage();
  const en = language === 'en';
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', company: '', role: '', email: '', website: '', segment: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    trackCTAClick(en ? 'Book your demo and get your free sample' : 'Planifiez votre démo et recevez votre échantillon', 'contact-form');

    try {
      const { data, error } = await supabase.functions.invoke('send-contact-form', {
        body: {
          name: formData.name,
          company: formData.company,
          role: formData.role,
          email: formData.email,
          website: formData.website,
          segment: formData.segment,
        },
      });

      if (error) throw error;

      setIsSubmitted(true);
      trackEvent('generate_lead', { method: 'contact_form', segment: formData.segment });
      toast({ title: en ? "Request sent!" : "Demande envoyée !", description: en ? "We'll get back to you within 24 hours to arrange a slot." : "Nous vous recontactons sous 24h pour fixer un créneau." });
    } catch (err) {
      console.error('Contact form error:', err);
      toast({ title: en ? "Error" : "Erreur", description: en ? "An error occurred. Please try again." : "Une erreur est survenue. Veuillez réessayer.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: string, value: string) => setFormData(prev => ({ ...prev, [field]: value }));

  const reassurances = [
    { icon: Clock, text: en ? "30-minute focused presentation + free sample" : "30 min de présentation ciblée + échantillon offert" },
    { icon: Shield, text: en ? "No commitment" : "Sans engagement" },
    { icon: Users, text: en ? "With an Innobiz product expert" : "Avec un expert produit Innobiz" },
  ];

  if (isSubmitted) {
    return (
      <section id="contact" className="section-padding bg-primary/5 relative overflow-hidden">
        <div className="section-container">
          <motion.div className="max-w-2xl mx-auto text-center" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
            <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-8">
              <CheckCircle2 className="w-10 h-10 text-primary" />
            </div>
            <h2 className="heading-section mb-4">{en ? 'Thank you for your request!' : 'Merci pour votre demande !'}</h2>
            <p className="text-body-lg mb-8 leading-relaxed">
              {en ? 'Our team will contact you within 24 business hours to schedule your personalised presentation.' : 'Notre équipe vous contactera sous 24 heures ouvrées pour planifier votre présentation personnalisée.'}
            </p>
          </motion.div>
        </div>
      </section>
    );
  }

  const discoveries = en ? [
    "Live demonstration of the Tolia diffuser and the Twist & Mist system",
    "Quantified impact on your consumable sales (real data)",
    "All white-label customisation options",
    "Pricing models, MOQ and deployment timeline",
    "Case studies from partner brands already launched",
  ] : [
    "Démonstration live du diffuseur Tolia et du système Twist & Mist",
    "Impact chiffré sur vos ventes de consommables (données réelles)",
    "Toutes les options de personnalisation en marque blanche",
    "Modèles de pricing, MOQ et timeline de déploiement",
    "Case studies de marques partenaires déjà lancées",
  ];

  return (
    <section id="contact" className="section-padding bg-primary/5 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl" />
      <div className="section-container relative z-10">
        <motion.div className="text-center mb-12" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <span className="text-primary font-semibold text-sm tracking-wide uppercase mb-4 block">{en ? 'Book a meeting' : 'Prendre Rendez-vous'}</span>
          <h2 className="heading-section mb-4">{en ? 'Book your demo and get your free sample' : 'Planifiez votre démo et recevez votre échantillon'}</h2>
          <p className="text-body-lg max-w-2xl mx-auto">
            {en ? 'In 30 minutes, we\'ll show you concretely how Tolia can transform your brand\'s business model and multiply your essential oil and home fragrance sales.' : 'En 30 minutes, nous vous montrons concrètement comment Tolia peut transformer le business model de votre marque et multiplier vos ventes d\'huiles essentielles et de parfums d\'intérieur.'}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <motion.div className="bg-card rounded-3xl p-8 border border-border/50 shadow-lg" initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">{en ? 'Full name' : 'Nom complet'} *</Label>
                  <Input id="name" placeholder={en ? "John Smith" : "Jean Dupont"} required value={formData.name} onChange={(e) => handleChange('name', e.target.value)} className="rounded-xl" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company">{en ? 'Company' : 'Société'} *</Label>
                  <Input id="company" placeholder={en ? "Your company" : "Votre entreprise"} required value={formData.company} onChange={(e) => handleChange('company', e.target.value)} className="rounded-xl" />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="role">{en ? 'Role' : 'Fonction'}</Label>
                  <Input id="role" placeholder={en ? "Marketing Director" : "Directeur Marketing"} value={formData.role} onChange={(e) => handleChange('role', e.target.value)} className="rounded-xl" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">{en ? 'Professional email' : 'Email professionnel'} *</Label>
                  <Input id="email" type="email" placeholder={en ? "john@company.com" : "jean@entreprise.com"} required value={formData.email} onChange={(e) => handleChange('email', e.target.value)} className="rounded-xl" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="website">{en ? 'Company website' : 'Site web de l\'entreprise'}</Label>
                <Input id="website" placeholder="https://www.your-site.com" value={formData.website} onChange={(e) => handleChange('website', e.target.value)} className="rounded-xl" />
              </div>
              <div className="space-y-2">
                <Label>{en ? 'Business segment' : 'Segment d\'activité'}</Label>
                <Select value={formData.segment} onValueChange={(v) => handleChange('segment', v)}>
                  <SelectTrigger className="rounded-xl"><SelectValue placeholder={en ? "Select your segment..." : "Sélectionnez votre segment..."} /></SelectTrigger>
                  <SelectContent className="bg-card">
                    <SelectItem value="he">{en ? 'Essential oils brand' : 'Marque d\'huiles essentielles'}</SelectItem>
                    <SelectItem value="diffuseur-home">{en ? 'Diffusers & Home Fragrance' : 'Diffuseurs & Home Fragrance'}</SelectItem>
                    <SelectItem value="dnvb">{en ? 'DNVB / Aroma E-commerce' : 'DNVB / E-commerce Aroma'}</SelectItem>
                    <SelectItem value="autre">{en ? 'Other' : 'Autre'}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button type="submit" className="w-full btn-hero-primary group" disabled={isSubmitting}>
                {isSubmitting ? (en ? "Sending..." : "Envoi en cours...") : (<>{en ? 'Book your demo and get your free sample' : 'Planifiez votre démo et recevez votre échantillon'}<ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" /></>)}
              </Button>
              <div className="flex flex-wrap items-center justify-center gap-6 pt-4">
                {reassurances.map((r, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <r.icon className="w-4 h-4 text-primary" /><span>{r.text}</span>
                  </div>
                ))}
              </div>
            </form>
          </motion.div>

          <motion.div className="flex flex-col justify-center" initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}>
            <h3 className="text-2xl font-bold mb-3">{en ? 'What you\'ll discover:' : 'Ce que vous découvrirez :'}</h3>
            <ul className="space-y-4 mb-8">
              {discoveries.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-foreground">{item}</span>
                </li>
              ))}
            </ul>
            <div className="bg-card rounded-2xl p-6 border border-border/50">
              <p className="text-sm text-muted-foreground leading-relaxed">
                <span className="font-semibold text-foreground">{en ? 'Guaranteed response within 24 business hours.' : 'Réponse garantie sous 24h ouvrées.'}</span>{' '}
                {en ? 'The presentation is personalised based on your segment and objectives.' : 'La présentation est personnalisée en fonction de votre segment et de vos objectifs.'}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
