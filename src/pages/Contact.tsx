import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ScrollReveal from '@/components/ScrollReveal';
import QualificationForm from '@/components/QualificationForm';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Calendar, MessageSquare, Paintbrush, Package } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const WhiteLabelForm: React.FC = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ name: '', company: '', email: '', website: '', message: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await supabase.functions.invoke('send-contact-form', {
        body: { ...formData, segment: 'white-label', role: 'White-label inquiry' },
      });
      toast({ title: 'Request sent', description: 'We\'ll get back to you within 48 hours.' });
      setFormData({ name: '', company: '', email: '', website: '', message: '' });
    } catch {
      toast({ title: 'Error', description: 'Please try again.', variant: 'destructive' });
    }
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h3 className="text-xl font-bold mb-2">White-label quote request</h3>
      <p className="text-sm text-muted-foreground mb-4">Tell us about your brand and we'll prepare a tailored proposal.</p>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="wl-name">Full name *</Label>
          <Input id="wl-name" required value={formData.name} onChange={e => setFormData(p => ({ ...p, name: e.target.value }))} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="wl-email">Email *</Label>
          <Input id="wl-email" type="email" required value={formData.email} onChange={e => setFormData(p => ({ ...p, email: e.target.value }))} />
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="wl-company">Company *</Label>
          <Input id="wl-company" required value={formData.company} onChange={e => setFormData(p => ({ ...p, company: e.target.value }))} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="wl-website">Website</Label>
          <Input id="wl-website" value={formData.website} onChange={e => setFormData(p => ({ ...p, website: e.target.value }))} />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="wl-message">Tell us about your project</Label>
        <Textarea id="wl-message" rows={4} value={formData.message} onChange={e => setFormData(p => ({ ...p, message: e.target.value }))} placeholder="Target market, volumes, branding requirements..." />
      </div>
      <Button type="submit" className="btn-hero-primary w-full md:w-auto" disabled={isSubmitting}>
        {isSubmitting ? 'Sending…' : 'Request a white-label quote'}
      </Button>
    </form>
  );
};

const OrderForm: React.FC = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ name: '', company: '', email: '', quantity: '300', message: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await supabase.functions.invoke('send-contact-form', {
        body: { ...formData, segment: 'order-300', role: `Order inquiry, ${formData.quantity} units` },
      });
      toast({ title: 'Order request sent', description: 'We\'ll confirm availability and pricing shortly.' });
      setFormData({ name: '', company: '', email: '', quantity: '300', message: '' });
    } catch {
      toast({ title: 'Error', description: 'Please try again.', variant: 'destructive' });
    }
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h3 className="text-xl font-bold mb-2">Order branded Tolia units</h3>
      <p className="text-sm text-muted-foreground mb-4">Minimum order: 300 pieces. Ready to ship as branded Tolia.</p>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="ord-name">Full name *</Label>
          <Input id="ord-name" required value={formData.name} onChange={e => setFormData(p => ({ ...p, name: e.target.value }))} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="ord-email">Email *</Label>
          <Input id="ord-email" type="email" required value={formData.email} onChange={e => setFormData(p => ({ ...p, email: e.target.value }))} />
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="ord-company">Company *</Label>
          <Input id="ord-company" required value={formData.company} onChange={e => setFormData(p => ({ ...p, company: e.target.value }))} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="ord-quantity">Quantity (min. 300) *</Label>
          <Input id="ord-quantity" type="number" min="300" required value={formData.quantity} onChange={e => setFormData(p => ({ ...p, quantity: e.target.value }))} />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="ord-message">Additional notes</Label>
        <Textarea id="ord-message" rows={3} value={formData.message} onChange={e => setFormData(p => ({ ...p, message: e.target.value }))} placeholder="Delivery timeline, distribution channels..." />
      </div>
      <Button type="submit" className="btn-hero-primary w-full md:w-auto" disabled={isSubmitting}>
        {isSubmitting ? 'Sending…' : 'Request order pricing'}
      </Button>
    </form>
  );
};

const GeneralInquiryForm: React.FC = () => {
  const { t, language } = useLanguage();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', company: '', message: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await supabase.functions.invoke('send-contact-form', {
        body: { ...formData, segment: 'info', role: 'General inquiry' },
      });
      toast({ title: language === 'fr' ? 'Message envoyé' : 'Message sent', description: language === 'fr' ? 'Nous reviendrons vers vous rapidement.' : 'We\'ll get back to you soon.' });
      setFormData({ name: '', email: '', company: '', message: '' });
    } catch {
      toast({ title: 'Error', description: language === 'fr' ? 'Veuillez réessayer.' : 'Please try again.', variant: 'destructive' });
    }
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="info-name">{t('form.name')} *</Label>
          <Input id="info-name" required value={formData.name} onChange={e => setFormData(p => ({ ...p, name: e.target.value }))} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="info-email">{t('form.email')} *</Label>
          <Input id="info-email" type="email" required value={formData.email} onChange={e => setFormData(p => ({ ...p, email: e.target.value }))} />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="info-company">{t('form.company')}</Label>
        <Input id="info-company" value={formData.company} onChange={e => setFormData(p => ({ ...p, company: e.target.value }))} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="info-message">{t('form.message')} *</Label>
        <Textarea id="info-message" rows={5} required value={formData.message} onChange={e => setFormData(p => ({ ...p, message: e.target.value }))} />
      </div>
      <Button type="submit" className="btn-hero-primary w-full md:w-auto" disabled={isSubmitting}>
        {isSubmitting ? (language === 'fr' ? 'Envoi…' : 'Sending…') : (language === 'fr' ? 'Envoyer' : 'Send')}
      </Button>
    </form>
  );
};

const Contact: React.FC = () => {
  const { t, language } = useLanguage();
  const [searchParams] = useSearchParams();
  const type = searchParams.get('type') || 'demo';

  const tabs = [
    { key: 'demo', icon: Calendar, label: 'Book a demo', desc: 'Schedule a 30-minute call to see Tolia in action' },
    { key: 'white-label', icon: Paintbrush, label: 'White-label quote', desc: 'Launch a custom diffuser under your own brand' },
    { key: 'order', icon: Package, label: 'Order 300+ units', desc: 'Add branded Tolia to your catalog, ready to ship' },
    { key: 'info', icon: MessageSquare, label: 'General inquiry', desc: 'Have a question? We\'re here to help' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <section className="pt-32 pb-20 bg-gradient-to-b from-secondary/30 to-background">
        <div className="section-container">
          <ScrollReveal>
            <h1 className="heading-display text-center mb-6">Let's talk</h1>
            <p className="text-body-lg text-center max-w-2xl mx-auto">Choose the option that best fits your needs.</p>
          </ScrollReveal>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="section-container max-w-5xl">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            {tabs.map((tab, i) => (
              <ScrollReveal key={tab.key} delay={i * 60}>
                <a href={`?type=${tab.key}`} className={`card-premium h-full block text-center ${type === tab.key ? 'ring-2 ring-primary' : ''}`}>
                  <tab.icon className="w-8 h-8 mx-auto mb-3" style={{ color: 'hsl(28 45% 48%)' }} />
                  <h3 className="font-bold text-sm mb-1">{tab.label}</h3>
                  <p className="text-xs text-muted-foreground">{tab.desc}</p>
                </a>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal>
            <div className="card-premium">
              {type === 'demo' && <QualificationForm />}
              {type === 'white-label' && <WhiteLabelForm />}
              {type === 'order' && <OrderForm />}
              {type === 'info' && <GeneralInquiryForm />}
            </div>
          </ScrollReveal>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Contact;
