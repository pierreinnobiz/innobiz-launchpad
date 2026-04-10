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
    { icon: Microscope, title: t3(language, 'Maîtrise microfluidique', 'Microfluidic mastery', 'Dominio microfluídico'), desc: t3(language, "Nous concevons des systèmes de diffusion qui gèrent chaque liquide, des huiles résineuses épaisses aux essences d'agrumes légères, avec une précision égale et zéro colmatage.", 'We engineer diffusion systems that handle every liquid, from thick resinous oils to light citrus essences, with equal precision and zero clogging.', 'Diseñamos sistemas de difusión que manejan cada líquido, desde aceites resinosos espesos hasta esencias cítricas ligeras, con igual precisión y cero obstrucciones.') },
    { icon: Volume2, title: t3(language, 'Ultrasons silencieux', 'Silent ultrasonics', 'Ultrasónicos silenciosos'), desc: t3(language, "Notre ingénierie acoustique propriétaire délivre une brume puissante avec zéro bruit audible. Pas de pompe, pas de ventilateur, juste une diffusion pure et silencieuse.", 'Our proprietary acoustic engineering delivers powerful mist with zero audible noise. No pump, no fan, just pure, silent diffusion.', 'Nuestra ingeniería acústica propietaria ofrece niebla potente con cero ruido audible. Sin bomba, sin ventilador, solo difusión pura y silenciosa.') },
    { icon: Crosshair, title: t3(language, 'Nébulisation laser de précision', 'Precision laser nebulisation', 'Nebulización láser de precisión'), desc: t3(language, "Chaque buse est validée au laser pour fonctionner parfaitement sur plus de 500 cycles de diffusion sans dégradation ni obstruction.", 'Every nozzle is laser-validated to perform flawlessly across 500+ diffusion cycles without degradation or obstruction.', 'Cada boquilla es validada por láser para funcionar sin fallos en más de 500 ciclos de difusión sin degradación ni obstrucción.') },
    { icon: Cpu, title: t3(language, 'Électronique embarquée intelligente', 'Smart embedded electronics', 'Electrónica embebida inteligente'), desc: t3(language, "Contrôle de débit millimétrique, gestion intelligente de l'énergie et 8 heures d'autonomie. Le tout dans un appareil plus léger qu'un smartphone.", 'Millimetric flow control, intelligent power management, and 8-hour autonomy, all in a device that weighs less than a smartphone.', 'Control de flujo milimétrico, gestión inteligente de energía y 8 horas de autonomía, todo en un dispositivo más ligero que un smartphone.') },
  ];

  const chips = [
    { icon: Calendar, label: t3(language, 'Fondé en 2005', 'Founded 2005', 'Fundada en 2005'), desc: t3(language, "20 ans de R&D ininterrompue en technologie de diffusion d'huiles essentielles", '20 years of uninterrupted R&D in essential oil diffusion technology', '20 años de I+D ininterrumpida en tecnología de difusión de aceites esenciales') },
    { icon: Shield, label: t3(language, 'Technologie exclusive', 'Exclusive technology', 'Tecnología exclusiva'), desc: t3(language, "Twist & Mist est une technologie propriétaire développée et protégée par Innobiz", 'Twist & Mist is a proprietary technology developed and protected by Innobiz', 'Twist & Mist es una tecnología propietaria desarrollada y protegida por Innobiz') },
    { icon: Flag, label: t3(language, 'Conçu et assemblé en France', 'Designed & assembled in France', 'Diseñado y ensamblado en Francia'), desc: t3(language, "Ingénierie, prototypage et assemblage final dans notre site français", 'Engineering, prototyping, and final assembly in our French facility', 'Ingeniería, prototipado y ensamblaje final en nuestra instalación francesa') },
    { icon: Wrench, label: t3(language, 'Réparable par conception', 'Repairable by design', 'Reparable por diseño'), desc: t3(language, "Batterie remplaçable par l'utilisateur, composants modulaires, conforme à vos engagements RSE et réduction des déchets", 'User-replaceable battery, modular components, aligns with your sustainability commitments and reduces waste', 'Batería reemplazable por el usuario, componentes modulares, alineado con sus compromisos de sostenibilidad y reducción de residuos') },
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
              "20 ans de R&D française. La seule entreprise au monde maîtrisant les 4 disciplines de la diffusion parfaite.",
              '20 years of French R&D. The only company in the world mastering all 4 disciplines of perfect diffusion.',
              '20 años de I+D francesa. La única empresa del mundo que domina las 4 disciplinas de la difusión perfecta.'
            )}
          </h2>
          <p className="text-white/60 leading-relaxed">
            {t3(language,
              "Innobiz conçoit et fabrique des systèmes de diffusion d'huiles essentielles depuis 2005, pour certaines des marques les plus exigeantes en pharmacie, bien-être et parfumerie de luxe. Tolia est notre produit de 7e génération, notre innovation la plus stratégique. Il repose sur un avantage technologique qui a nécessité deux décennies de développement et qu'aucun concurrent n'a pu reproduire.",
              "Innobiz has been designing and manufacturing essential oil diffusion systems since 2005, for some of the most demanding brands in pharmacy, wellness and luxury fragrance. Tolia is our 7th-generation product and our most strategic innovation. It is built on a technological advantage that took two decades to develop and that no competitor has been able to replicate.",
              'Innobiz ha diseñado y fabricado sistemas de difusión de aceites esenciales desde 2005, para algunas de las marcas más exigentes en farmacia, bienestar y perfumería de lujo. Tolia es nuestro producto de 7ª generación y nuestra innovación más estratégica. Está construido sobre una ventaja tecnológica que tomó dos décadas desarrollar y que ningún competidor ha podido replicar.'
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
              "Cette combinaison unique d'expertises (microfluidique, acoustique, ingénierie laser et électronique embarquée) constitue un avantage concurrentiel structurel qui ne peut être ni copié ni acquis du jour au lendemain.",
              'This unique combination of expertise (microfluidics, acoustics, laser engineering and embedded electronics) is a structural competitive advantage that cannot be reverse-engineered or acquired overnight.',
              'Esta combinación única de expertise (microfluídica, acústica, ingeniería láser y electrónica embebida) es una ventaja competitiva estructural que no puede ser replicada ni adquirida de la noche a la mañana.'
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
