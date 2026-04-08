// TODO: extend Supabase schema to accept new fields (path, conditional fields)
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowRight, CheckCircle2, Paintbrush, Package } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { trackCTAClick, trackEvent } from '@/lib/tracking';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/integrations/supabase/client';
import { fadeBlurUp } from '@/lib/animations';

type Path = 'white-label' | 'stock';

const roles = ['CEO', 'Innovation', 'Marketing', 'Category', 'Procurement', 'R&D', 'Other'];
const wlWindows = ['Q2 this year', 'Q3 this year', 'Q4 this year', 'Next year', 'Exploring'];
const wlVolumes = ['3K–5K', '5K–10K', '10K–25K', '25K+'];
const wlCustomOptions = ['Unit color', 'Logo', 'Capsule blends', 'Packaging', 'Full bespoke'];
const stockQtys = ['300', '500', '1000', '1500+'];
const stockTimings = ['Within 1 month', '1–3 months', 'Exploring'];

const ContactSection: React.FC = () => {
  const { toast } = useToast();
  const { language } = useLanguage();
  const en = language === 'en';
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [path, setPath] = useState<Path>('white-label');
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [role, setRole] = useState('');
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState('');
  const [country, setCountry] = useState('');
  const [notes, setNotes] = useState('');
  const [wlWindow, setWlWindow] = useState('');
  const [wlVolume, setWlVolume] = useState('');
  const [wlCustom, setWlCustom] = useState<string[]>([]);
  const [stockQty, setStockQty] = useState('');
  const [stockCountry, setStockCountry] = useState('');
  const [stockTiming, setStockTiming] = useState('');

  useEffect(() => {
    const readParam = () => {
      const params = new URLSearchParams(window.location.search);
      const type = params.get('type');
      if (type === 'stock' || type === 'order') setPath('stock');
      else setPath('white-label');
    };
    readParam();
    const handler = () => readParam();
    window.addEventListener('tolia:pathchange', handler);
    return () => window.removeEventListener('tolia:pathchange', handler);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const trackLabel = path === 'white-label' ? 'contact_submit_whitelabel' : 'contact_submit_stock';
    trackCTAClick(trackLabel, 'contact-form');

    const payload = {
      path, name, company, role, email, website, country, notes,
      ...(path === 'white-label' ? { wl_window: wlWindow, wl_volume: wlVolume, wl_customization: wlCustom } : {}),
      ...(path === 'stock' ? { stock_qty: stockQty, stock_country: stockCountry, stock_timing: stockTiming } : {}),
    };

    try {
      const { error } = await supabase.functions.invoke('send-contact-form', {
        body: { name, company, role, email, website, segment: path, ...payload },
      });
      if (error) throw error;
      setIsSubmitted(true);
      trackEvent('generate_lead', { method: 'contact_form', segment: path });
      toast({
        title: en ? 'Request sent!' : 'Demande envoyée !',
        description: en ? "We'll get back to you within one business day." : 'Nous vous recontactons sous 24h ouvrées.',
      });
    } catch (err) {
      console.error('Contact form error:', err);
      toast({
        title: en ? 'Error' : 'Erreur',
        description: en ? 'An error occurred. Please try again.' : 'Une erreur est survenue. Veuillez réessayer.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleCustom = (opt: string) => {
    setWlCustom((prev) => (prev.includes(opt) ? prev.filter((o) => o !== opt) : [...prev, opt]));
  };

  if (isSubmitted) {
    return (
      <section id="contact" className="py-24 md:py-32 bg-secondary relative overflow-hidden">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }} animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }} transition={{ duration: 0.7 }}>
            <motion.div
              className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-8"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
            >
              <CheckCircle2 className="w-10 h-10 text-primary" />
            </motion.div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
              {en ? 'Thank you for your request!' : 'Merci pour votre demande !'}
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {en ? "Our team will get back to you within one business day with a tailored proposal." : "Notre équipe vous recontactera sous 24h ouvrées avec une proposition sur-mesure."}
            </p>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="py-24 md:py-32 bg-secondary relative overflow-hidden">
      {/* Subtle ambient decoration */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <motion.div
          className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full opacity-[0.03]"
          style={{ background: 'radial-gradient(circle, hsl(28 45% 48%), transparent 60%)' }}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="max-w-3xl mx-auto px-6 md:px-12 lg:px-20 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeBlurUp}
        >
          <span className="font-semibold text-sm tracking-wide uppercase mb-4 block" style={{ color: 'hsl(28 45% 48%)' }}>
            {en ? 'Start the conversation' : 'Démarrer la conversation'}
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
            {en ? 'Tell us how you want to work with Tolia.' : 'Dites-nous comment vous souhaitez travailler avec Tolia.'}
          </h2>
          <p className="text-base text-muted-foreground font-light max-w-2xl mx-auto">
            {en
              ? "One form. Two paths. We'll come back within one business day with a tailored proposal — and a free sample shipped to your office."
              : "Un formulaire. Deux parcours. Nous reviendrons sous 24h ouvrées avec une proposition sur-mesure — et un échantillon gratuit envoyé à votre bureau."}
          </p>
        </motion.div>

        <motion.div
          className="bg-card rounded-3xl p-8 md:p-10 border border-border/50 shadow-lg"
          initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Path selector */}
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { key: 'white-label' as Path, icon: Paintbrush, label: 'White-label program', sub: 'Build your signature diffuser', color: 'hsl(28 45% 48%)' },
                { key: 'stock' as Path, icon: Package, label: 'Stock order (300+ units)', sub: 'Add branded Tolia to your range', color: 'hsl(220 40% 45%)' },
              ].map((p) => (
                <motion.button
                  key={p.key}
                  type="button"
                  className={`text-left p-5 rounded-2xl border-2 transition-all ${
                    path === p.key ? 'border-primary bg-primary/5' : 'border-border/50 hover:border-border'
                  }`}
                  onClick={() => setPath(p.key)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${path === p.key ? 'border-primary' : 'border-muted-foreground/40'}`}>
                      {path === p.key && <motion.div className="w-2 h-2 rounded-full bg-primary" layoutId="path-dot" />}
                    </div>
                    <p.icon className="w-5 h-5" style={{ color: p.color }} />
                  </div>
                  <h3 className="font-bold text-sm text-foreground">{p.label}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{p.sub}</p>
                </motion.button>
              ))}
            </div>

            {/* Shared fields */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full name *</Label>
                <Input id="name" required value={name} onChange={(e) => setName(e.target.value)} className="rounded-xl" placeholder="Jane Smith" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company">Company *</Label>
                <Input id="company" required value={company} onChange={(e) => setCompany(e.target.value)} className="rounded-xl" placeholder="Your company" />
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="role">Role *</Label>
                <Select value={role} onValueChange={setRole}>
                  <SelectTrigger className="rounded-xl"><SelectValue placeholder="Select your role" /></SelectTrigger>
                  <SelectContent className="bg-card">
                    {roles.map((r) => <SelectItem key={r} value={r}>{r}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Professional email *</Label>
                <Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="rounded-xl" placeholder="jane@company.com" />
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="website">Company website</Label>
                <Input id="website" value={website} onChange={(e) => setWebsite(e.target.value)} className="rounded-xl" placeholder="https://..." />
              </div>
              <div className="space-y-2">
                <Label htmlFor="country">Country / region *</Label>
                <Input id="country" required value={country} onChange={(e) => setCountry(e.target.value)} className="rounded-xl" placeholder="France" />
              </div>
            </div>

            {/* White-label conditional fields */}
            {path === 'white-label' && (
              <motion.div
                className="space-y-4 p-5 rounded-2xl border border-border/40 bg-muted/30"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">White-label details</p>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Target launch window</Label>
                    <Select value={wlWindow} onValueChange={setWlWindow}>
                      <SelectTrigger className="rounded-xl"><SelectValue placeholder="Select..." /></SelectTrigger>
                      <SelectContent className="bg-card">
                        {wlWindows.map((w) => <SelectItem key={w} value={w}>{w}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Estimated first-year volume</Label>
                    <Select value={wlVolume} onValueChange={setWlVolume}>
                      <SelectTrigger className="rounded-xl"><SelectValue placeholder="Select..." /></SelectTrigger>
                      <SelectContent className="bg-card">
                        {wlVolumes.map((v) => <SelectItem key={v} value={v}>{v}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Level of customization needed</Label>
                  <div className="flex flex-wrap gap-3 pt-1">
                    {wlCustomOptions.map((opt) => (
                      <label key={opt} className="flex items-center gap-2 text-sm cursor-pointer">
                        <Checkbox checked={wlCustom.includes(opt)} onCheckedChange={() => toggleCustom(opt)} />
                        <span>{opt}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Stock conditional fields */}
            {path === 'stock' && (
              <motion.div
                className="space-y-4 p-5 rounded-2xl border border-border/40 bg-muted/30"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Stock order details</p>
                <div className="grid sm:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Desired quantity</Label>
                    <Select value={stockQty} onValueChange={setStockQty}>
                      <SelectTrigger className="rounded-xl"><SelectValue placeholder="Select..." /></SelectTrigger>
                      <SelectContent className="bg-card">
                        {stockQtys.map((q) => <SelectItem key={q} value={q}>{q}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Ship-to country *</Label>
                    <Input required={path === 'stock'} value={stockCountry} onChange={(e) => setStockCountry(e.target.value)} className="rounded-xl" placeholder="Country" />
                  </div>
                  <div className="space-y-2">
                    <Label>Launch timing</Label>
                    <Select value={stockTiming} onValueChange={setStockTiming}>
                      <SelectTrigger className="rounded-xl"><SelectValue placeholder="Select..." /></SelectTrigger>
                      <SelectContent className="bg-card">
                        {stockTimings.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Notes */}
            <div className="space-y-2">
              <Label htmlFor="notes">Anything else we should know?</Label>
              <Textarea id="notes" rows={4} value={notes} onChange={(e) => setNotes(e.target.value)} className="rounded-xl" placeholder="Optional" />
            </div>

            {/* Submit */}
            <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}>
              <Button type="submit" className="w-full btn-hero-primary group h-12 text-base" disabled={isSubmitting}>
                {isSubmitting ? 'Sending...' : path === 'white-label' ? 'Request my white-label consultation' : 'Request my stock-order quote'}
                {!isSubmitting && <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />}
              </Button>
            </motion.div>

            <p className="text-xs text-center text-muted-foreground pt-2">
              We respond within one business day. Your information stays with Innobiz — no resale, no newsletter.
            </p>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
