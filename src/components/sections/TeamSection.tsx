import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { trackCTAClick } from '@/lib/tracking';
import { useLanguage } from '@/contexts/LanguageContext';
import { t3 } from '@/lib/t3';
import MagneticButton from '@/components/MagneticButton';

const TeamSection: React.FC = () => {
  const { language: l } = useLanguage();
  const ctaText = t3(l, 'Planifiez votre démo et recevez votre échantillon', 'Book your demo and get your free sample', 'Reserve su demo y reciba su muestra gratis');

  return (
    <section className="section-padding bg-background relative overflow-hidden">
      <div className="section-container">
        <motion.div className="max-w-4xl mx-auto" initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }} whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }} viewport={{ once: true }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
          <span className="font-semibold text-sm tracking-wide uppercase mb-4 block" style={{ color: 'hsl(28 45% 48%)' }}>
            {t3(l, 'L\'équipe', 'The team', 'El equipo')}
          </span>
          <h2 className="heading-section mb-8">
            {t3(l, 'Qui se cache derrière Tolia ?', 'Who\'s behind Tolia?', '¿Quién está detrás de Tolia?')}
          </h2>

          <div className="space-y-5 text-muted-foreground leading-relaxed text-base">
            <p>{t3(l, 'Nous sommes Innobiz, une équipe de gens suffisamment sérieux pour être devenus leader européen de la diffusion d\'huiles essentielles… et suffisamment passionnés pour tester nos prototypes aussi bien au bureau qu\'à la maison, dans les salles de réunion, les open‑spaces et les salons où traînent des valises de flacons. Depuis près de 20 ans, nous concevons et fabriquons des diffuseurs pour les plus grandes marques d\'aromathérapie, en marque blanche, avec une obsession : créer des produits beaux, fiables et intuitifs qui donnent envie d\'utiliser l\'aromathérapie tous les jours, pas seulement le week‑end.', 'We are Innobiz, a team serious enough to have become Europe\'s leading essential oil diffusion company… and passionate enough to test our prototypes at the office, at home, in meeting rooms, open-plan spaces and living rooms strewn with suitcases of bottles. For nearly 20 years we have been designing and manufacturing diffusers for the biggest aromatherapy brands, as a white-label partner, with a single obsession: creating beautiful, reliable, intuitive products that make people want to use aromatherapy every day, not just at weekends.', 'Somos Innobiz, un equipo lo suficientemente serio como para haberse convertido en líder europeo de la difusión de aceites esenciales… y lo suficientemente apasionado como para probar nuestros prototipos tanto en la oficina como en casa, en salas de reuniones, espacios abiertos y salones llenos de maletas de frascos. Desde hace casi 20 años diseñamos y fabricamos difusores para las mayores marcas de aromaterapia, en marca blanca, con una obsesión: crear productos bonitos, fiables e intuitivos que den ganas de usar la aromaterapia todos los días, no solo los fines de semana.')}</p>
            <p>{t3(l, 'Nos idées naissent rarement dans des PowerPoint : elles émergent plutôt autour d\'une table encombrée d\'échantillons, lors d\'un salon à l\'autre bout du monde, d\'une visite chez un laboratoire partenaire ou d\'une conversation improvisée avec un client qui nous explique ce qui l\'agace vraiment dans les diffuseurs actuels. Tolia est exactement le résultat de ces moments : un diffuseur conçu avec ceux qui vendent l\'aromathérapie, pour ceux qui la vivent au quotidien, et développé par une équipe qui aime suffisamment ce métier pour en parler aussi bien en réunion stratégique qu\'à l\'apéritif.', 'Our ideas rarely emerge from PowerPoint decks: they tend to surface around a table cluttered with samples, at a trade show on the other side of the world, during a visit to a partner laboratory or an impromptu conversation with a client explaining what really annoys them about current diffusers. Tolia is precisely the result of those moments: a diffuser conceived with those who sell aromatherapy, for those who live it every day, and developed by a team that loves this business enough to talk about it both in strategy meetings and over drinks.', 'Nuestras ideas rara vez nacen en PowerPoints: suelen surgir alrededor de una mesa llena de muestras, en una feria al otro lado del mundo, durante una visita a un laboratorio asociado o en una conversación improvisada con un cliente que nos explica lo que realmente le molesta de los difusores actuales. Tolia es exactamente el resultado de esos momentos: un difusor concebido con quienes venden aromaterapia, para quienes la viven a diario, y desarrollado por un equipo que ama este oficio lo suficiente como para hablar de él tanto en reuniones estratégicas como en el aperitivo.')}</p>
          </div>

          <motion.div className="text-center mt-10" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }}>
          <MagneticButton>
            <a href="#contact" onClick={() => trackCTAClick(ctaText, 'team')}>
              <Button className="btn-hero-primary group">
                {ctaText}
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </a>
          </MagneticButton>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default TeamSection;
