import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import logoImg from '../assets/logo.png';

export default function OpeningSequence({ onComplete }) {
  const [stage, setStage] = useState('black'); // 'black' -> 'reveal' -> 'glow' -> 'done'
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      setReducedMotion(true);
      onComplete?.();
      return;
    }

    const t1 = setTimeout(() => {
      setStage('reveal');
    }, 400);

    const t2 = setTimeout(() => {
      setStage('glow');
    }, 1000);

    const t3 = setTimeout(() => {
      setStage('done');
      onComplete?.();
    }, 2700);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onComplete]);

  const handleSkip = () => {
    setStage('done');
    onComplete?.();
  };

  if (reducedMotion || stage === 'done') {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#07060D] text-[#ECEAF5] overflow-hidden cursor-pointer select-none"
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
        onClick={handleSkip}
        role="region"
        aria-label="Opening Studio Sequence"
      >
        {/* Cinematic letterbox bars */}
        <div className="absolute top-0 inset-x-0 h-10 md:h-14 bg-black/80 border-b border-[#1A1629]" />
        <div className="absolute bottom-0 inset-x-0 h-10 md:h-14 bg-black/80 border-t border-[#1A1629] flex items-center justify-between px-6 text-[10px] font-mono text-[#8A84A3]/70">
          <span>BUILDBYTES STUDIO // INITIALIZING</span>
          <span className="hover:text-[#E53E9C] transition-colors">CLICK OR SPACE TO SKIP</span>
        </div>

        {/* Center Logo & Wordmark Container */}
        <div className="relative flex flex-col items-center text-center px-6">
          
          {/* Circular Badge Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{
              opacity: stage !== 'black' ? 1 : 0,
              scale: stage !== 'black' ? 1 : 0.85
            }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative mb-6"
          >
            {/* Soft purple/magenta radial glow behind logo */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#7B2FF7]/40 to-[#E53E9C]/30 blur-2xl rounded-full transform scale-150 pointer-events-none" />

            <img
              src={logoImg}
              alt="BuildBytes B3 Circular Logo"
              className="relative w-24 h-24 sm:w-28 sm:h-28 object-contain drop-shadow-[0_0_35px_rgba(123,47,247,0.5)]"
            />
          </motion.div>

          {/* Wordmark with Gradient Glow Sweep */}
          <div className="relative inline-block overflow-hidden py-2">
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{
                opacity: stage !== 'black' ? 1 : 0,
                y: stage !== 'black' ? 0 : 15
              }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="font-display font-condensed text-5xl sm:text-7xl md:text-8xl tracking-tight text-[#ECEAF5] font-extrabold uppercase leading-none drop-shadow-2xl"
            >
              BUILD<span className="bg-gradient-to-r from-[#7B2FF7] to-[#E53E9C] bg-clip-text text-transparent">BYTES</span>
            </motion.h1>

            {/* Gradient Glow Sweep Overlay */}
            {stage === 'glow' && (
              <motion.div
                className="absolute inset-0 pointer-events-none"
                initial={{ x: '-130%', opacity: 0 }}
                animate={{ x: '190%', opacity: [0, 0.95, 0.95, 0] }}
                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  background: 'linear-gradient(105deg, transparent 20%, rgba(123, 47, 247, 0.45) 45%, rgba(229, 62, 156, 0.7) 50%, rgba(79, 110, 247, 0.5) 55%, transparent 75%)',
                  transform: 'skewX(-20deg)',
                  mixBlendMode: 'screen',
                }}
              />
            )}
          </div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: stage === 'glow' ? 1 : 0, y: stage === 'glow' ? 0 : 10 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-4 font-mono text-xs sm:text-sm text-[#8A84A3] tracking-cinema-wide uppercase"
          >
            SOFTWARE & BUSINESS AUTOMATION STUDIO
          </motion.p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
