import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useInView } from 'framer-motion';
import '@fontsource/caveat/500.css';
import '@fontsource/caveat/700.css';

const statements = [
  "Every consumer searching for a diffuser faces the same impossible choice: silent or powerful, portable or effective, simple or flexible. No technology delivers it all. That's why we built Tolia.",
  "When a diffuser is complicated, usage fades. Within months, it's in a closet. And the oils stop being purchased.",
  "Aromatherapy brands invest heavily to win customers, but without daily rituals, repurchase erodes. Tolia turns occasional users into daily consumers. That changes everything.",
];

const CHAR_DELAY = 11; // ms per character
const STATEMENT_PAUSE = 400; // ms pause between statements

const TypewriterText: React.FC<{
  text: string;
  startDelay: number;
  onComplete: () => void;
  isActive: boolean;
}> = ({ text, startDelay, onComplete, isActive }) => {
  const [visibleCount, setVisibleCount] = useState(0);
  const hasStarted = useRef(false);

  useEffect(() => {
    if (!isActive || hasStarted.current) return;
    hasStarted.current = true;

    const timeout = setTimeout(() => {
      let i = 0;
      const interval = setInterval(() => {
        i++;
        setVisibleCount(i);
        if (i >= text.length) {
          clearInterval(interval);
          onComplete();
        }
      }, CHAR_DELAY);
      return () => clearInterval(interval);
    }, startDelay);

    return () => clearTimeout(timeout);
  }, [isActive, text, startDelay, onComplete]);

  return (
    <span>
      <span>{text.slice(0, visibleCount)}</span>
      {visibleCount > 0 && visibleCount < text.length && (
        <span
          className="inline-block w-[2px] h-[1.1em] align-text-bottom ml-[1px] animate-pulse"
          style={{ background: 'hsl(28 50% 65% / 0.6)' }}
        />
      )}
    </span>
  );
};

const FounderStatementSection: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [activeStatement, setActiveStatement] = useState(-1);
  const [completedStatements, setCompletedStatements] = useState<Set<number>>(new Set());
  const [showSignature, setShowSignature] = useState(false);

  useEffect(() => {
    if (isInView && activeStatement === -1) {
      setActiveStatement(0);
    }
  }, [isInView, activeStatement]);

  const handleComplete = useCallback((index: number) => {
    setCompletedStatements(prev => new Set(prev).add(index));
    if (index < statements.length - 1) {
      setTimeout(() => setActiveStatement(index + 1), STATEMENT_PAUSE);
    } else {
      setTimeout(() => setShowSignature(true), 600);
    }
  }, []);

  return (
    <section
      className="py-24 md:py-32 relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, hsl(25 20% 10%) 0%, hsl(25 18% 14%) 100%)' }}
    >
      <div ref={ref} className="max-w-[800px] mx-auto px-6 md:px-12 relative">
        {/* Decorative quotation mark */}
        <motion.div
          className="absolute -top-4 -left-2 md:left-0 text-[8rem] md:text-[10rem] leading-none select-none pointer-events-none"
          style={{ color: 'hsl(28 50% 65% / 0.12)', fontFamily: "'Caveat', cursive" }}
          aria-hidden="true"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          "
        </motion.div>

        <div className="space-y-8 relative z-10">
          {statements.map((text, i) => (
            <p
              key={i}
              className="text-xl sm:text-2xl md:text-[1.75rem] leading-[1.6] min-h-[1.6em]"
              style={{
                fontFamily: "'Caveat', cursive",
                fontWeight: 500,
                color: completedStatements.has(i)
                  ? 'hsl(35 25% 88%)'
                  : activeStatement === i
                  ? 'hsl(35 25% 88%)'
                  : 'transparent',
                transition: 'color 0.3s ease',
              }}
            >
              {activeStatement >= i ? (
                <TypewriterText
                  text={`"${text}"`}
                  startDelay={0}
                  onComplete={() => handleComplete(i)}
                  isActive={activeStatement === i}
                />
              ) : null}
            </p>
          ))}

          {/* Signature */}
          <motion.div
            className="pt-8 text-right"
            initial={{ opacity: 0, y: 10 }}
            animate={showSignature ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div className="inline-block">
              <div className="w-10 h-px mb-4 ml-auto" style={{ background: 'hsl(28 50% 65% / 0.3)' }} />
              <p
                className="text-2xl md:text-3xl"
                style={{ fontFamily: "'Caveat', cursive", fontWeight: 700, color: 'hsl(35 25% 92%)' }}
              >
                Pierre-Emmanuel Thuret
              </p>
              <p className="text-sm font-light mt-1" style={{ color: 'hsl(35 20% 60%)' }}>
                Founder, Innobiz &mdash; 20 years of diffusion R&D
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FounderStatementSection;
