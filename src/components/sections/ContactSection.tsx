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
import { supabase } from '@/integrations/supabase/client';
import { fadeBlurUp } from '@/lib/animations';
import { useLanguage } from '@/contexts/LanguageContext';
import { t3 } from '@/lib/t3';

type Path = 'white-label' | 'stock';

const ContactSection: React.FC = () => {
  const { language } = useLanguage();
  const { toast } = useToast();
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

  const roles = [
    t3(language, 'PDG', 'CEO', 'CEO'),
    t3(language, 'Innovation', 'Innovation', 'Innovación'),
    t3(language, 'Marketing', 'Marketing', 'Marketing'),
    t3(language, 'Catégorie', 'Category', 'Categoría'),
    t3(language, 'Achats', 'Purchasing', 'Compras'),
    t3(language, 'R&D', 'R&D', 'I+D'),
    t3(language, 'Autre', 'Other', 'Otro'),
  ];
  const wlWindows = [
    t3(language, 'T2 cette année', 'Q2 this year', 'T2 este año'),
    t3(language, 'T3 cette année', 'Q3 this year', 'T3 este año'),
    t3(language, 'T4 cette année', 'Q4 this year', 'T4 este año'),
    t3(language, "L'année prochaine", 'Next year', 'El próximo año'),
    t3(language, 'En exploration', 'Exploring', 'Explorando'),
  ];
  const wlVolumes = ['3K–5K', '5K–10K', '10K–25K', '25K+'];
  const wlCustomOptions = [
    t3(language, 'Couleur unité', 'Unit color', 'Color unidad'),
    t3(language, 'Finition', 'Finish', 'Acabado'),
    t3(language, 'Logo', 'Logo', 'Logo'),
    t3(language, 'Synergies personnalisées', 'Custom blends', 'Mezclas personalizadas'),
    t3(language, 'Packaging', 'Packaging', 'Packaging'),
    t3(language, 'Sur mesure complet', 'Full bespoke', 'Totalmente a medida'),
  ];
  const stockQtys = ['300', '500', '1000', '1500+'];
  const stockTimings = [
    t3(language, "Sous 1 mois", 'Within 1 month', 'En 1 mes'),
    t3(language, '1–3 mois', '1–3 months', '1–3 meses'),
    t3(language, 'En exploration', 'Exploring', 'Explorando'),
  ];

  useEffect(() => {
    const readParam = () => {
      const params = new URLSearchParams(window.location.search);
      const type = params.get('type');
      if (type === 'stock' || type === 'order') setPath('stock');
      else setPath('white-label');
    };
    readParam();
    window.addEventListener('tolia:pathchange', readParam);
    return () => window.removeEventListener('tolia:pathchange', readParam);
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
        title: t3(language, 'Demande envoyée !', 'Request sent!', '¡Solicitud enviada!'),
        description: t3(language, 'Nous vous répondrons sous un jour ouvré.', "We'll get back to you within one business day.", 'Le responderemos en un día laborable.'),
      });
    } catch (err) {
      console.error('Contact form error:', err);
      toast({
        title: t3(language, 'Erreur', 'Error', 'Error'),
        description: t3(language, 'Une erreur est survenue. Veuillez réessayer.', 'An error occurred. Please try again.', 'Ocurrió un error. Por favor, inténtelo de nuevo.'),
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
      <section id="contact" className="py-14 md:py-20 bg-secondary relative overflow-hidden">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }} animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }} transition={{ duration: 0.7 }}>
            <motion.div
              className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-8"
              initial={{ scale: 0 }} animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
            >
              <CheckCircle2 className="w-10 h-10 text-primary" />
            </motion.div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
              {t3(language, 'Merci pour votre demande !', 'Thank you for your request!', '¡Gracias por su solicitud!')}
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {t3(language,
                'Notre équipe vous répondra sous un jour ouvré avec une proposition sur mesure.',
                'Our team will get back to you within one business day with a tailored proposal.',
                'Nuestro equipo le responderá en un día laborable con una propuesta a medida.'
              )}
            </p>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="py-14 md:py-20 bg-secondary relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <motion.div
          className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full opacity-[0.03]"
          style={{ background: 'radial-gradient(circle, hsl(28 45% 48%), transparent 60%)' }}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="max-w-3xl mx-auto px-6 md:px-12 lg:px-20 relative z-10">
        <motion.div
          className="text-center mb-12"
          initial="hidden" whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeBlurUp}
        >
          <span className="font-semibold text-sm tracking-wide uppercase mb-4 block" style={{ color: 'hsl(28 45% 48%)' }}>
            {t3(language, "Prêt à transformer vos ventes d'huiles ?", 'Ready to transform your oil sales?', '¿Listo para transformar sus ventas de aceites?')}
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t3(language,
              'Parlez-nous de votre marque : nous construirons une proposition adaptée à votre marché.',
              "Tell us about your brand, we'll build a proposal tailored to your market.",
              'Háblenos de su marca : construiremos una propuesta adaptada a su mercado.'
            )}
          </h2>
          <p className="text-base text-muted-foreground font-light max-w-2xl mx-auto">
            {t3(language,
              "Un formulaire. Deux parcours. Vous recevrez une réponse personnalisée sous un jour ouvré, accompagnée d'un échantillon Tolia gratuit expédié directement à votre bureau pour découvrir le produit par vous-même.",
              "One form. Two paths. You'll receive a personalized response within one business day, along with a free Tolia sample shipped directly to your office so you can experience the product firsthand.",
              'Un formulario. Dos caminos. Recibirá una respuesta personalizada en un día laborable, junto con una muestra gratuita de Tolia enviada directamente a su oficina para que pueda experimentar el producto de primera mano.'
            )}
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
                { key: 'white-label' as Path, icon: Paintbrush, label: t3(language, 'Programme marque blanche', 'White-label program', 'Programa marca blanca'), sub: t3(language, 'Créez votre diffuseur signature', 'Build your signature diffuser', 'Cree su difusor firma'), color: 'hsl(28 45% 48%)' },
                { key: 'stock' as Path, icon: Package, label: t3(language, 'Commande stock (300+ unités)', 'Stock order (300+ units)', 'Pedido stock (300+ unidades)'), sub: t3(language, 'Ajoutez Tolia brandé à votre gamme', 'Add branded Tolia to your range', 'Añada Tolia con marca a su gama'), color: 'hsl(220 40% 45%)' },
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
                <Label htmlFor="name">{t3(language, 'Nom complet *', 'Full name *', 'Nombre completo *')}</Label>
                <Input id="name" required value={name} onChange={(e) => setName(e.target.value)} className="rounded-xl" placeholder={t3(language, 'Marie Dupont', 'Jane Smith', 'María García')} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company">{t3(language, 'Entreprise *', 'Company *', 'Empresa *')}</Label>
                <Input id="company" required value={company} onChange={(e) => setCompany(e.target.value)} className="rounded-xl" placeholder={t3(language, 'Votre entreprise', 'Your company', 'Su empresa')} />
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="role">{t3(language, 'Fonction *', 'Role *', 'Cargo *')}</Label>
                <Select value={role} onValueChange={setRole}>
                  <SelectTrigger className="rounded-xl"><SelectValue placeholder={t3(language, 'Sélectionnez votre fonction', 'Select your role', 'Seleccione su cargo')} /></SelectTrigger>
                  <SelectContent className="bg-card">
                    {roles.map((r) => <SelectItem key={String(r)} value={String(r)}>{r}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">{t3(language, 'Email professionnel *', 'Professional email *', 'Email profesional *')}</Label>
                <Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="rounded-xl" placeholder="jane@company.com" />
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="website">{t3(language, 'Site web', 'Company website', 'Sitio web')}</Label>
                <Input id="website" value={website} onChange={(e) => setWebsite(e.target.value)} className="rounded-xl" placeholder="https://..." />
              </div>
              <div className="space-y-2">
                <Label htmlFor="country">{t3(language, 'Pays / région *', 'Country / region *', 'País / región *')}</Label>
                <Input id="country" required value={country} onChange={(e) => setCountry(e.target.value)} className="rounded-xl" placeholder={t3(language, 'France', 'France', 'Francia')} />
              </div>
            </div>

            {/* White-label fields */}
            {path === 'white-label' && (
              <motion.div
                className="space-y-4 p-5 rounded-2xl border border-border/40 bg-muted/30"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{t3(language, 'Détails marque blanche', 'White-label details', 'Detalles marca blanca')}</p>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>{t3(language, 'Fenêtre de lancement visée', 'Target launch window', 'Ventana de lanzamiento objetivo')}</Label>
                    <Select value={wlWindow} onValueChange={setWlWindow}>
                      <SelectTrigger className="rounded-xl"><SelectValue placeholder={t3(language, 'Sélectionner...', 'Select...', 'Seleccionar...')} /></SelectTrigger>
                      <SelectContent className="bg-card">
                        {wlWindows.map((w) => <SelectItem key={String(w)} value={String(w)}>{w}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>{t3(language, 'Volume estimé première année', 'Estimated first-year volume', 'Volumen estimado primer año')}</Label>
                    <Select value={wlVolume} onValueChange={setWlVolume}>
                      <SelectTrigger className="rounded-xl"><SelectValue placeholder={t3(language, 'Sélectionner...', 'Select...', 'Seleccionar...')} /></SelectTrigger>
                      <SelectContent className="bg-card">
                        {wlVolumes.map((v) => <SelectItem key={v} value={v}>{v}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>{t3(language, 'Niveau de personnalisation souhaité', 'Level of customization needed', 'Nivel de personalización necesario')}</Label>
                  <div className="flex flex-wrap gap-3 pt-1">
                    {wlCustomOptions.map((opt) => (
                      <label key={String(opt)} className="flex items-center gap-2 text-sm cursor-pointer">
                        <Checkbox checked={wlCustom.includes(String(opt))} onCheckedChange={() => toggleCustom(String(opt))} />
                        <span>{opt}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Stock fields */}
            {path === 'stock' && (
              <motion.div
                className="space-y-4 p-5 rounded-2xl border border-border/40 bg-muted/30"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{t3(language, 'Détails commande stock', 'Stock order details', 'Detalles pedido stock')}</p>
                <div className="grid sm:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>{t3(language, 'Quantité souhaitée', 'Desired quantity', 'Cantidad deseada')}</Label>
                    <Select value={stockQty} onValueChange={setStockQty}>
                      <SelectTrigger className="rounded-xl"><SelectValue placeholder={t3(language, 'Sélectionner...', 'Select...', 'Seleccionar...')} /></SelectTrigger>
                      <SelectContent className="bg-card">
                        {stockQtys.map((q) => <SelectItem key={q} value={q}>{q}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>{t3(language, 'Pays de livraison *', 'Ship-to country *', 'País de envío *')}</Label>
                    <Input required={path === 'stock'} value={stockCountry} onChange={(e) => setStockCountry(e.target.value)} className="rounded-xl" placeholder={t3(language, 'Pays', 'Country', 'País')} />
                  </div>
                  <div className="space-y-2">
                    <Label>{t3(language, 'Timing de lancement', 'Launch timing', 'Timing de lanzamiento')}</Label>
                    <Select value={stockTiming} onValueChange={setStockTiming}>
                      <SelectTrigger className="rounded-xl"><SelectValue placeholder={t3(language, 'Sélectionner...', 'Select...', 'Seleccionar...')} /></SelectTrigger>
                      <SelectContent className="bg-card">
                        {stockTimings.map((t) => <SelectItem key={String(t)} value={String(t)}>{t}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Notes */}
            <div className="space-y-2">
              <Label htmlFor="notes">{t3(language, "Autre chose que nous devrions savoir ?", 'Anything else we should know?', '¿Algo más que debamos saber?')}</Label>
              <Textarea id="notes" rows={4} value={notes} onChange={(e) => setNotes(e.target.value)} className="rounded-xl" placeholder={t3(language, 'Facultatif', 'Optional', 'Opcional')} />
            </div>

            {/* Submit */}
            <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}>
              <Button type="submit" className="w-full btn-hero-primary group h-12 text-base" disabled={isSubmitting}>
                {isSubmitting
                  ? t3(language, 'Envoi en cours...', 'Sending...', 'Enviando...')
                  : path === 'white-label'
                    ? t3(language, 'Demander ma consultation marque blanche', 'Request my white-label consultation', 'Solicitar mi consulta de marca blanca')
                    : t3(language, 'Demander mon devis stock', 'Request my stock-order quote', 'Solicitar mi presupuesto de stock')
                }
                {!isSubmitting && <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />}
              </Button>
            </motion.div>

            <p className="text-xs text-center text-muted-foreground pt-2">
              {t3(language,
                'Nous répondons sous un jour ouvré. Vos informations restent chez Innobiz. Pas de revente, pas de newsletter.',
                'We respond within one business day. Your information stays with Innobiz. No resale, no newsletter.',
                'Respondemos en un día laborable. Su información queda en Innobiz. Sin reventa, sin newsletter.'
              )}
            </p>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
