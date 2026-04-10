import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useInView } from 'framer-motion';
import '@fontsource/caveat/500.css';
import '@fontsource/caveat/700.css';

const statements = [
  "Every consumer searching for a diffuser faces the same impossible choice: silent or powerful, portable or effective, simple or flexible. No technology delivers it all. That's why we built Tolia.",
  "When a diffuser is complicated, usage fades. Within months, it's in a closet. And the oils stop being purchased.",
  "Aromatherapy brands invest heavily to win customers, but without daily rituals, repurchase erodes. Tolia turns occasional users into daily consumers. That changes everything.",
];

const CHAR_DELAY = 5;
const STATEMENT_PAUSE = 250;

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
      setTimeout(() => setShowSignature(true), 400);
    }
  }, []);

  return (
    <section
      className="py-10 md:py-14 relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, hsl(25 20% 10%) 0%, hsl(25 18% 14%) 100%)' }}
    >
      <div ref={ref} className="max-w-[860px] mx-auto px-6 md:px-12 relative">
        {/* Correspondence card */}
        <motion.div
          className="relative rounded-xl overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, hsl(38 30% 96%) 0%, hsl(35 25% 93%) 100%)',
            boxShadow: '0 8px 40px -12px hsl(25 30% 10% / 0.5), 0 2px 8px -2px hsl(25 30% 10% / 0.3)',
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {/* Card header with logo */}
          <div className="px-8 pt-6 pb-3 flex items-center justify-between border-b" style={{ borderColor: 'hsl(28 30% 85% / 0.5)' }}>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'hsl(28 45% 48%)' }}>
                <span className="text-white text-xs font-bold">IB</span>
              </div>
              <div>
                <span className="text-sm font-semibold tracking-wide" style={{ color: 'hsl(25 15% 25%)' }}>INNOBIZ</span>
                <span className="text-[10px] text-muted-foreground block leading-tight">Diffusion Technology</span>
              </div>
            </div>
            <span className="text-[10px] uppercase tracking-widest font-medium" style={{ color: 'hsl(28 30% 65%)' }}>Private note</span>
          </div>

          {/* Card body */}
          <div className="px-8 py-6 space-y-5">
            {statements.map((text, i) => (
              <p
                key={i}
                className="text-lg sm:text-xl md:text-[1.4rem] leading-[1.6] min-h-[1.4em]"
                style={{
                  fontFamily: "'Caveat', cursive",
                  fontWeight: 500,
                  color: completedStatements.has(i) || activeStatement === i
                    ? 'hsl(25 20% 22%)'
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

            {/* Signature area */}
            <motion.div
              className="pt-4 flex items-end justify-between"
              initial={{ opacity: 0 }}
              animate={showSignature ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <div>
                <div className="w-8 h-px mb-3" style={{ background: 'hsl(28 30% 70%)' }} />
                <p
                  className="text-2xl md:text-3xl"
                  style={{ fontFamily: "'Caveat', cursive", fontWeight: 700, color: 'hsl(25 20% 20%)' }}
                >
                  Pierre-Emmanuel Thuret
                </p>
                <p className="text-xs font-light mt-0.5" style={{ color: 'hsl(25 15% 50%)' }}>
                  Founder, Innobiz &mdash; 20 years of diffusion R&D
                </p>
              </div>
              {/* Fake handwritten signature */}
              <svg width="120" height="50" viewBox="0 0 120 50" className="opacity-60 mb-1" aria-hidden="true">
                <path
                  d="M5 35 C15 10, 25 45, 35 25 C45 5, 50 40, 60 20 C70 0, 75 35, 85 15 C90 5, 95 30, 105 20 C110 15, 115 25, 118 22"
                  fill="none"
                  stroke="hsl(25 20% 30%)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path
                  d="M30 38 C50 42, 80 38, 100 40"
                  fill="none"
                  stroke="hsl(25 20% 30%)"
                  strokeWidth="1"
                  strokeLinecap="round"
                />
              </svg>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FounderStatementSection;
