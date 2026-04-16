import React from 'react';
import { motion } from 'framer-motion';
import { Microscope, Volume2, Crosshair, Cpu, Calendar, Shield, Flag, Wrench } from 'lucide-react';
import { fadeBlurUp, staggerContainer } from '@/lib/animations';
import TiltCard from '@/components/TiltCard';
import { useLanguage } from '@/contexts/LanguageContext';
import { t3 } from '@/lib/t3';

const WhyInnobizSection: React.FC = () => {
  const { language } = useLanguage();

  const disciplines = [
    { icon: Microscope, title: t3(language, 'Maîtrise microfluidique', 'Microfluidic mastery', 'Dominio microfluídico'), desc: t3(language, "Gestion précise de chaque liquide : huiles résineuses, essences d'agrumes, hydrolats. Zéro colmatage, zéro compromis.", 'Precise handling of every liquid: resinous oils, citrus essences, hydrosols. Zero clogging, zero compromise.', 'Gestión precisa de cada líquido: aceites resinosos, esencias cítricas, hidrolatos. Cero obstrucción, cero compromiso.') },
    { icon: Volume2, title: t3(language, 'Ultrasons silencieux', 'Silent ultrasonics', 'Ultrasónicos silenciosos'), desc: t3(language, "Brume puissante, zéro bruit audible. Ni pompe, ni ventilateur. Diffusion pure et silencieuse.", 'Powerful mist, zero audible noise. No pump, no fan. Pure, silent diffusion.', 'Niebla potente, cero ruido audible. Sin bomba, sin ventilador. Difusión pura y silenciosa.') },
    { icon: Crosshair, title: t3(language, 'Nébulisation laser de précision', 'Precision laser nebulisation', 'Nebulización láser de precisión'), desc: t3(language, "Chaque buse validée au laser. Performance constante sur 500+ cycles, sans dégradation.", 'Every nozzle laser-validated. Consistent performance across 500+ cycles, no degradation.', 'Cada boquilla validada por láser. Rendimiento constante en 500+ ciclos, sin degradación.') },
    { icon: Cpu, title: t3(language, 'Électronique intelligente', 'Smart electronics', 'Electrónica inteligente'), desc: t3(language, "Contrôle de débit millimétrique, 50h d'autonomie. Plus léger qu'un smartphone.", 'Millimetric flow control, 50-hour autonomy. Lighter than a smartphone.', 'Control de flujo milimétrico, 50h de autonomía. Más ligero que un smartphone.') },
  ];

  const chips = [
    { icon: Calendar, label: t3(language, 'Fondé en 2005', 'Founded 2005', 'Fundada en 2005'), desc: t3(language, "20 ans de R&D dédiée à la diffusion d'huiles essentielles", '20 years of R&D dedicated to essential oil diffusion', '20 años de I+D dedicada a la difusión de aceites esenciales') },
    { icon: Shield, label: t3(language, 'Technologie exclusive', 'Exclusive technology', 'Tecnología exclusiva'), desc: t3(language, "Twist & Mist : technologie propriétaire développée et protégée par Innobiz", 'Twist & Mist: proprietary technology developed and protected by Innobiz', 'Twist & Mist: tecnología propietaria desarrollada y protegida por Innobiz') },
    { icon: Flag, label: t3(language, 'Conçu en France', 'Designed in France', 'Diseñado en Francia'), desc: t3(language, "Ingénierie, prototypage et assemblage dans notre site français", 'Engineering, prototyping and assembly in our French facility', 'Ingeniería, prototipado y ensamblaje en nuestra instalación francesa') },
    { icon: Wrench, label: t3(language, 'Réparable par conception', 'Repairable by design', 'Reparable por diseño'), desc: t3(language, "Batterie remplaçable, composants modulaires. Conforme à vos engagements RSE.", 'Replaceable battery, modular components. Aligned with your sustainability goals.', 'Batería reemplazable, componentes modulares. Alineado con sus objetivos de sostenibilidad.') },
  ];

  return (
    <section id="why-innobiz" className="py-14 md:py-20 relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, hsl(25 20% 12%) 0%, hsl(25 18% 16%) 100%)' }}>
      <motion.div
        className="absolute bottom-0 left-1/3 w-[500px] h-[500px] rounded-full opacity-[0.05] pointer-events-none"
        style={{ background: 'radial-gradient(circle, hsl(28 50% 55%), transparent 60%)' }}
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-20 text-white relative z-10">
        <motion.div
          className="text-center mb-12 max-w-4xl mx-auto"
          initial="hidden" whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeBlurUp}
        >
          <span className="font-semibold text-sm tracking-wide uppercase mb-4 block" style={{ color: 'hsl(28 50% 65%)' }}>
            {t3(language, 'Qui fabrique Tolia, et pourquoi ça compte', 'Who builds Tolia, and why it matters', 'Quién fabrica Tolia, y por qué importa')}
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4">
            {t3(language,
              "20 ans de R&D. Un savoir-faire unique au monde.",
              '20 years of R&D. A unique expertise worldwide.',
              '20 años de I+D. Una experiencia única en el mundo.'
            )}
          </h2>
          <p className="text-white/60 leading-relaxed">
            {t3(language,
              "Innobiz conçoit des systèmes de diffusion depuis 2005 pour les marques les plus exigeantes en pharmacie, bien-être et parfumerie de luxe. Tolia est notre 7e génération, construite sur un avantage technologique de 20 ans qu'aucun concurrent n'a pu reproduire.",
              "Innobiz has designed diffusion systems since 2005 for the most demanding brands in pharmacy, wellness and luxury fragrance. Tolia is our 7th generation, built on a 20-year technological advantage no competitor has replicated.",
              'Innobiz diseña sistemas de difusión desde 2005 para las marcas más exigentes en farmacia, bienestar y perfumería de lujo. Tolia es nuestra 7ª generación, construida sobre una ventaja tecnológica de 20 años que ningún competidor ha replicado.'
            )}
          </p>
        </motion.div>

        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
          initial="hidden" whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={staggerContainer}
        >
          {disciplines.map((d, i) => (
            <motion.div key={i} variants={fadeBlurUp}>
              <TiltCard className="h-full" maxTilt={6} glare>
                <div
                  className="rounded-2xl p-6 md:p-8 border text-center h-full
                    transition-all duration-500 hover:shadow-[0_0_40px_-8px_hsl(28_50%_65%/0.2)]"
                  style={{ background: 'hsl(28 50% 65% / 0.08)', borderColor: 'hsl(28 50% 65% / 0.15)' }}
                >
                  <div className="w-12 h-12 rounded-xl mx-auto flex items-center justify-center mb-4"
                    style={{ background: 'hsl(28 50% 65% / 0.15)' }}>
                    <d.icon className="w-6 h-6" style={{ color: 'hsl(28 50% 65%)' }} />
                  </div>
                  <h3 className="font-bold text-sm mb-2">{d.title}</h3>
                  <p className="text-xs leading-relaxed" style={{ color: 'hsl(35 20% 72%)' }}>{d.desc}</p>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="max-w-3xl mx-auto rounded-2xl p-6 md:p-8 text-center mb-12"
          style={{ background: 'hsl(28 50% 65% / 0.1)', border: '1px solid hsl(28 50% 65% / 0.2)' }}
          initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-base md:text-lg font-semibold text-white">
            {t3(language,
              "Microfluidique, acoustique, laser, électronique embarquée : quatre disciplines, un seul fabricant. Un avantage structurel impossible à copier.",
              'Microfluidics, acoustics, laser, embedded electronics: four disciplines, one manufacturer. A structural advantage impossible to copy.',
              'Microfluídica, acústica, láser, electrónica embebida: cuatro disciplinas, un solo fabricante. Una ventaja estructural imposible de copiar.'
            )}
          </p>
        </motion.div>

        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto"
          initial="hidden" whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          {chips.map((c, i) => (
            <motion.div key={i} variants={fadeBlurUp}
              className="flex items-start gap-3 rounded-xl p-4"
              style={{ background: 'hsl(0 0% 100% / 0.04)' }}
            >
              <c.icon className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: 'hsl(28 50% 65%)' }} />
              <div>
                <span className="font-semibold text-sm text-white block">{c.label}</span>
                <span className="text-xs" style={{ color: 'hsl(35 20% 65%)' }}>{c.desc}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WhyInnobizSection;
