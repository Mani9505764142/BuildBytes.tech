import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Sparkles, Play } from 'lucide-react';
import logoImg from '../assets/logo.png';
import { netflixAudio } from '../utils/netflixSound';

export default function OpeningSequence({ onComplete }) {
  // If the user previously interacted or audio is already running, ready immediately.
  // Otherwise, require an explicit cinematic click so the browser unlocks full audio.
  const [isReadyToPlay, setIsReadyToPlay] = useState(() => {
    return netflixAudio.isAudioAllowed();
  });

  // Stages: 'intro-card' -> 'ribbon-reveal' -> 'ta-dum' -> 'warp-speed' -> 'fade-out' -> 'done'
  const [stage, setStage] = useState('intro-card');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [audioTriggered, setAudioTriggered] = useState(false);
  const canvasRef = useRef(null);
  const animFrameRef = useRef(null);

  const handleStartWithAudio = async (e) => {
    if (e && e.stopPropagation) e.stopPropagation();
    await netflixAudio.unlockAudio();
    setIsReadyToPlay(true);
  };

  const handleSkip = (e) => {
    if (e && e.stopPropagation) e.stopPropagation();
    netflixAudio.stopAllAudio(0.1);
    setStage('done');
    onComplete?.();
  };

  useEffect(() => {
    if (!isReadyToPlay) return;

    // Check reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      onComplete?.();
      return;
    }

    // Sequence timeline:
    // 0ms: 'intro-card' ("A BUILDBYTES ORIGINAL") + Cinematic theater suspense drone & sub-bass tension
    // 500ms: 'ribbon-reveal' (The 3D Ribbon Logo appears)
    // 1350ms: 'ta-dum' (TA-DUM sound + ribbons deconstruct into spectrum strips + camera shake)
    // 2100ms: 'warp-speed' (Explosive 3D zoom through light ribbons tunnel)
    // 4100ms: 'fade-out' (Light clears into dark space)
    // 4650ms: 'done' (Smooth transition into website ambient soundscape)

    // Start deep theater room presence & tension drone right away
    netflixAudio.playIntroAtmosphere();

    const t1 = setTimeout(() => {
      setStage('ribbon-reveal');
    }, 500);

    const t2 = setTimeout(() => {
      setStage('ta-dum');
      netflixAudio.playTaDum();
      setAudioTriggered(true);
    }, 1350);

    const t3 = setTimeout(() => {
      setStage('warp-speed');
      netflixAudio.playWarpRush();
    }, 2100);

    const t4 = setTimeout(() => {
      setStage('fade-out');
      // Fade out all audio before the intro concludes
      netflixAudio.stopAllAudio(0.5);
    }, 4100);

    const t5 = setTimeout(() => {
      setStage('done');
      netflixAudio.stopAllAudio(0.1);
      onComplete?.();
    }, 4650);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
      netflixAudio.stopAllAudio(0.1);
    };
  }, [isReadyToPlay, onComplete]);

  // Keyboard shortcut listener (Space or Esc to skip / Enter to start)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isReadyToPlay) {
        if (e.code === 'Enter' || e.code === 'Space') {
          e.preventDefault();
          handleStartWithAudio();
        } else if (e.code === 'Escape') {
          e.preventDefault();
          handleSkip();
        }
        return;
      }

      if (e.code === 'Space' || e.code === 'Escape' || e.code === 'Enter') {
        e.preventDefault();
        handleSkip();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isReadyToPlay]);

  const toggleSound = (e) => {
    e.stopPropagation();
    const nextState = !soundEnabled;
    setSoundEnabled(nextState);
    netflixAudio.setMuted(!nextState);
  };

  // Canvas 3D Light Ribbon Tunnel Animation (Hyper-drive spectrum zoom)
  useEffect(() => {
    if (!isReadyToPlay || (stage !== 'warp-speed' && stage !== 'fade-out')) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const spectrumColors = [
      { r: 229, g: 9, b: 20 },     // Netflix Red
      { r: 229, g: 62, b: 156 },   // BuildBytes Magenta
      { r: 123, g: 47, b: 247 },   // BuildBytes Purple
      { r: 79, g: 110, b: 247 },   // Cyber Blue
      { r: 0, g: 240, b: 255 },    // Neon Cyan
      { r: 255, g: 75, b: 140 },   // Hot Pink
      { r: 168, g: 85, b: 247 },   // Vivid Violet
      { r: 255, g: 255, b: 255 },  // Bright White
    ];

    const ribbonCount = Math.min(220, Math.floor(width * 0.16));
    const ribbons = [];

    for (let i = 0; i < ribbonCount; i++) {
      const angle = (i / ribbonCount) * Math.PI * 2 + (Math.random() - 0.5) * 0.2;
      const initialDist = Math.random() * 80 + 15;
      const speed = 1.05 + Math.random() * 0.08;
      const color = spectrumColors[i % spectrumColors.length];

      ribbons.push({
        angle,
        distance: initialDist,
        speed,
        width: Math.random() * 5 + 2,
        length: Math.random() * 120 + 60,
        color,
        depth: Math.random() * 600 + 100,
        pulseOffset: Math.random() * Math.PI * 2,
      });
    }

    const dustCount = 80;
    const dust = [];
    for (let i = 0; i < dustCount; i++) {
      dust.push({
        x: (Math.random() - 0.5) * width * 1.5,
        y: (Math.random() - 0.5) * height * 1.5,
        z: Math.random() * 1000 + 100,
        size: Math.random() * 2 + 1,
        color: spectrumColors[i % spectrumColors.length],
      });
    }

    const startTime = performance.now();
    const focalLength = 350;

    const render = (now) => {
      const elapsed = (now - startTime) / 1000;
      ctx.fillStyle = 'rgba(0, 0, 0, 0.28)';
      ctx.fillRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;
      const speedMultiplier = Math.min(4.5, 1 + elapsed * 2.2);

      ribbons.forEach((r) => {
        r.distance *= Math.pow(r.speed, speedMultiplier);
        r.depth -= 14 * speedMultiplier;
        if (r.depth <= 20 || r.distance > Math.max(width, height) * 1.2) {
          r.distance = Math.random() * 40 + 10;
          r.depth = 600;
        }

        const currentScale = focalLength / Math.max(20, r.depth);
        const x = centerX + Math.cos(r.angle) * r.distance;
        const y = centerY + Math.sin(r.angle) * r.distance;
        const tailX = centerX + Math.cos(r.angle) * (r.distance - r.length * currentScale);
        const tailY = centerY + Math.sin(r.angle) * (r.distance - r.length * currentScale);

        const alpha = Math.min(1, Math.max(0.15, (r.distance / (width * 0.4))));
        const grad = ctx.createLinearGradient(tailX, tailY, x, y);
        grad.addColorStop(0, `rgba(${r.color.r}, ${r.color.g}, ${r.color.b}, 0)`);
        grad.addColorStop(0.5, `rgba(${r.color.r}, ${r.color.g}, ${r.color.b}, ${alpha * 0.75})`);
        grad.addColorStop(1, `rgba(255, 255, 255, ${alpha})`);

        ctx.strokeStyle = grad;
        ctx.lineWidth = Math.max(1, r.width * currentScale);
        ctx.lineCap = 'round';

        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(x, y);
        ctx.stroke();
      });

      dust.forEach((p) => {
        p.z -= 18 * speedMultiplier;
        if (p.z <= 0) p.z = 1000;

        const scale = focalLength / (focalLength + p.z);
        const sx = centerX + p.x * scale;
        const sy = centerY + p.y * scale;

        if (sx >= 0 && sx <= width && sy >= 0 && sy <= height) {
          ctx.fillStyle = `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${scale * 0.8})`;
          ctx.beginPath();
          ctx.arc(sx, sy, p.size * scale, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      const flareAlpha = Math.sin(Math.min(Math.PI, elapsed * 1.5)) * 0.65;
      if (flareAlpha > 0.05) {
        const flareGrad = ctx.createLinearGradient(0, centerY, width, centerY);
        flareGrad.addColorStop(0, 'rgba(123, 47, 247, 0)');
        flareGrad.addColorStop(0.2, 'rgba(79, 110, 247, 0.15)');
        flareGrad.addColorStop(0.45, `rgba(229, 62, 156, ${flareAlpha * 0.7})`);
        flareGrad.addColorStop(0.5, `rgba(255, 255, 255, ${flareAlpha})`);
        flareGrad.addColorStop(0.55, `rgba(229, 62, 156, ${flareAlpha * 0.7})`);
        flareGrad.addColorStop(0.8, 'rgba(123, 47, 247, 0.15)');
        flareGrad.addColorStop(1, 'rgba(79, 110, 247, 0)');

        ctx.fillStyle = flareGrad;
        ctx.fillRect(0, centerY - 2.5, width, 5);

        const coreBloom = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 160);
        coreBloom.addColorStop(0, `rgba(255, 255, 255, ${flareAlpha * 0.8})`);
        coreBloom.addColorStop(0.3, `rgba(229, 62, 156, ${flareAlpha * 0.5})`);
        coreBloom.addColorStop(0.7, `rgba(123, 47, 247, ${flareAlpha * 0.2})`);
        coreBloom.addColorStop(1, 'transparent');

        ctx.fillStyle = coreBloom;
        ctx.beginPath();
        ctx.arc(centerX, centerY, 160, 0, Math.PI * 2);
        ctx.fill();
      }

      animFrameRef.current = requestAnimationFrame(render);
    };

    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [isReadyToPlay, stage]);

  if (stage === 'done') {
    return null;
  }

  const isTaDum = stage === 'ta-dum';
  const isWarp = stage === 'warp-speed';

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-[#000000] text-[#ECEAF5] overflow-hidden select-none"
        initial={{ opacity: 1 }}
        animate={{ opacity: stage === 'fade-out' ? 0 : 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
        onClick={!isReadyToPlay ? handleStartWithAudio : undefined}
        role="region"
        aria-label="Netflix Style Intro Sequence"
      >
        {/* Cinematic Letterbox Bars */}
        <div className="absolute top-0 inset-x-0 h-10 sm:h-14 bg-black z-30 pointer-events-none border-b border-[#1A1629]/50 shadow-2xl" />
        <div className="absolute bottom-0 inset-x-0 h-10 sm:h-14 bg-black z-30 pointer-events-none border-t border-[#1A1629]/50 shadow-2xl" />

        {/* Ambient Dark Background Glow */}
        <div className="absolute inset-0 bg-radial-gradient from-[#1a0f2e]/60 via-[#05040a]/90 to-[#000000] pointer-events-none" />

        {/* --- INITIAL INTERACTIVE LAUNCH SCREEN (REQUIRED BY BROWSER AUTOPLAY POLICY) --- */}
        {!isReadyToPlay ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-40 flex flex-col items-center justify-center max-w-lg px-6 text-center pointer-events-auto"
          >
            {/* Ambient Radial Spotlight Glow */}
            <div className="absolute -inset-16 bg-gradient-to-tr from-[#7B2FF7]/25 via-[#E53E9C]/25 to-[#E50914]/20 blur-3xl rounded-full pointer-events-none" />

            {/* Glowing Logo Icon */}
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.7 }}
              className="relative w-24 h-24 sm:w-28 sm:h-28 mb-6 rounded-full p-3 bg-[#15121F]/90 border border-[#3E3559] shadow-[0_0_40px_rgba(229,62,156,0.35)] flex items-center justify-center"
            >
              <div className="absolute inset-0 rounded-full border border-[#00F0FF]/40 animate-ping opacity-30" />
              <img
                src={logoImg}
                alt="BuildBytes Circular Logo"
                className="w-full h-full object-contain rounded-full drop-shadow-[0_0_15px_rgba(229,62,156,0.6)]"
              />
            </motion.div>

            {/* Eyebrow Telemetry Badge */}
            <div className="mb-4 inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#15121F]/90 border border-[#29233B] text-[10px] font-mono text-[#8A84A3] shadow-lg">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E50914] animate-pulse" />
              <span className="text-[#ECEAF5] font-semibold tracking-wider">CINEMATIC AUDIO EXPERIENCE</span>
              <span className="text-[#4E4861]">•</span>
              <span className="text-[#00F0FF]">DOLBY ATMOS SIM</span>
            </div>

            {/* Headline */}
            <h2 className="font-display text-4xl sm:text-6xl font-extrabold uppercase text-[#ECEAF5] tracking-widest mb-3 drop-shadow-[0_4px_30px_rgba(0,0,0,0.9)]">
              BUILD<span className="bg-gradient-to-r from-[#E50914] via-[#E53E9C] to-[#7B2FF7] bg-clip-text text-transparent">BYTES</span>
            </h2>

            <p className="text-xs sm:text-sm font-sans text-[#8A84A3] max-w-sm mb-8 leading-relaxed">
              Click below to experience the opening sequence with immersive spatial sound.
            </p>

            {/* Primary Action: ENTER WITH SOUND */}
            <button
              id="enter-with-sound-btn"
              onClick={handleStartWithAudio}
              className="group relative px-8 py-4 sm:px-10 sm:py-4.5 rounded-2xl bg-gradient-to-r from-[#E50914] via-[#E53E9C] to-[#7B2FF7] hover:from-[#FF1E27] hover:via-[#F155AD] hover:to-[#8C47F8] text-white font-mono font-bold text-sm sm:text-base tracking-wider uppercase shadow-[0_0_40px_rgba(229,62,156,0.55)] hover:shadow-[0_0_60px_rgba(229,9,20,0.8)] hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center space-x-3 cursor-pointer"
            >
              <Volume2 className="w-5 h-5 text-white animate-bounce" />
              <span>EXPERIENCE WITH SOUND</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-black/40 font-mono text-white/90">TA-DUM</span>
            </button>

            {/* Secondary Option: Skip */}
            <button
              onClick={handleSkip}
              className="mt-6 text-[11px] font-mono text-[#8A84A3]/70 hover:text-white transition-colors cursor-pointer"
            >
              Skip Intro & Enter Website →
            </button>
          </motion.div>
        ) : (
          <>
            {/* --- STAGE 0: "A BUILDBYTES ORIGINAL" Prologue Card --- */}
            {stage === 'intro-card' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.45 }}
                className="absolute z-20 flex flex-col items-center justify-center text-center px-4"
              >
                <span className="font-mono text-xs sm:text-sm tracking-[0.35em] text-[#ECEAF5]/80 uppercase font-medium">
                  A BUILDBYTES ORIGINAL
                </span>
              </motion.div>
            )}

            {/* --- STAGE 1 & 2: THE 3D NETFLIX-STYLE RIBBON MONOGRAM & WORDMARK --- */}
            {(stage === 'ribbon-reveal' || stage === 'ta-dum' || stage === 'warp-speed') && (
              <motion.div
                className="relative z-10 flex flex-col items-center justify-center text-center"
                initial={{ scale: 0.82, opacity: 0 }}
                animate={{
                  scale: isWarp ? 24 : isTaDum ? 1.04 : 1,
                  opacity: isWarp ? [1, 0.9, 0] : 1,
                  x: isTaDum ? [0, -3, 3, -2, 2, 0] : 0,
                  y: isTaDum ? [0, 2, -3, 2, -1, 0] : 0,
                }}
                transition={{
                  scale: isWarp
                    ? { duration: 1.9, ease: [0.7, 0, 0.84, 0] }
                    : { duration: 0.85, ease: [0.16, 1, 0.3, 1] },
                  opacity: isWarp ? { duration: 0.8, delay: 0.6 } : { duration: 0.6 },
                  x: isTaDum ? { duration: 0.45, ease: 'linear' } : {},
                  y: isTaDum ? { duration: 0.45, ease: 'linear' } : {},
                }}
              >
                {/* The Sculpted 3D Ribbon Monogram "B" */}
                <div className="relative mb-5 sm:mb-7 flex items-center justify-center">
                  {/* Backlight halo glow */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-tr from-[#E50914]/40 via-[#7B2FF7]/50 to-[#E53E9C]/60 blur-3xl rounded-full transform scale-150 pointer-events-none"
                    animate={{
                      opacity: isTaDum ? [0.4, 0.95, 0.6] : 0.5,
                      scale: isTaDum ? [1.4, 1.8, 1.6] : 1.4,
                    }}
                    transition={{ duration: 0.6 }}
                  />

                  {/* SVG 3D Netflix-Style Folded Ribbon "B" */}
                  <svg
                    viewBox="0 0 160 200"
                    className="relative w-28 h-36 sm:w-36 sm:h-44 md:w-44 md:h-56 filter drop-shadow-[0_0_40px_rgba(229,62,156,0.6)]"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <defs>
                      {/* Left Vertical Ribbon Gradient */}
                      <linearGradient id="netflixRibbonLeft" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#E50914" />
                        <stop offset="50%" stopColor="#A81467" />
                        <stop offset="100%" stopColor="#7B2FF7" />
                      </linearGradient>

                      {/* Upper Ribbon Loop Gradient */}
                      <linearGradient id="netflixRibbonTopLoop" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#A81467" />
                        <stop offset="40%" stopColor="#E53E9C" />
                        <stop offset="85%" stopColor="#7B2FF7" />
                        <stop offset="100%" stopColor="#4F6EF7" />
                      </linearGradient>

                      {/* Lower Ribbon Loop with Iconic Curved Arc Gradient */}
                      <linearGradient id="netflixRibbonBottomLoop" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#7B2FF7" />
                        <stop offset="50%" stopColor="#E53E9C" />
                        <stop offset="100%" stopColor="#E50914" />
                      </linearGradient>

                      {/* 3D Fold Shadow Overlay */}
                      <linearGradient id="ribbonShadow" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="rgba(0,0,0,0.85)" />
                        <stop offset="60%" stopColor="rgba(0,0,0,0.3)" />
                        <stop offset="100%" stopColor="transparent" />
                      </linearGradient>

                      {/* Specular Edge Highlight */}
                      <linearGradient id="edgeGleam" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="rgba(255,255,255,0.9)" />
                        <stop offset="40%" stopColor="rgba(255,255,255,0.15)" />
                        <stop offset="100%" stopColor="transparent" />
                      </linearGradient>

                      {/* Spectrum Bars Mask when Ta-Dum strikes */}
                      <pattern id="spectrumVerticalPattern" width="4" height="200" patternUnits="userSpaceOnUse">
                        <line x1="0" y1="0" x2="0" y2="200" stroke="#FFFFFF" strokeWidth="2.5" />
                        <line x1="3" y1="0" x2="3" y2="200" stroke="transparent" strokeWidth="1.5" />
                      </pattern>
                    </defs>

                    {/* 1. Left Vertical Stem (The Anchor Ribbon) */}
                    <rect
                      x="28"
                      y="18"
                      width="28"
                      height="164"
                      rx="3"
                      fill="url(#netflixRibbonLeft)"
                    />
                    {/* Left stem specular highlight */}
                    <rect
                      x="28"
                      y="18"
                      width="4"
                      height="164"
                      rx="2"
                      fill="url(#edgeGleam)"
                      opacity="0.8"
                    />

                    {/* 2. Upper Sculpted Loop (Folded Ribbon) */}
                    <path
                      d="M 56 18 H 105 C 130 18, 142 36, 142 58 C 142 80, 126 95, 98 95 H 56 Z"
                      fill="url(#netflixRibbonTopLoop)"
                    />
                    {/* Upper Loop Inner Cutout */}
                    <path
                      d="M 56 38 H 98 C 114 38, 120 46, 120 58 C 120 70, 114 76, 98 76 H 56 Z"
                      fill="#000000"
                    />
                    {/* Upper Loop 3D Crease Shadow */}
                    <path
                      d="M 56 18 L 74 18 L 68 95 L 56 95 Z"
                      fill="url(#ribbonShadow)"
                      opacity="0.75"
                    />

                    {/* 3. Lower Sculpted Loop with Signature Netflix Curved Base */}
                    <path
                      d="M 56 92 H 108 C 136 92, 148 112, 148 138 C 148 164, 132 182, 102 182 H 56 Z"
                      fill="url(#netflixRibbonBottomLoop)"
                    />
                    {/* Lower Loop Inner Cutout */}
                    <path
                      d="M 56 112 H 102 C 118 112, 126 122, 126 138 C 126 154, 118 162, 102 162 H 56 Z"
                      fill="#000000"
                    />
                    {/* Lower Loop 3D Crease Shadow */}
                    <path
                      d="M 56 92 L 76 92 L 70 182 L 56 182 Z"
                      fill="url(#ribbonShadow)"
                      opacity="0.85"
                    />

                    {/* 4. Signature Netflix Bottom Arc Contour Cutout */}
                    <path
                      d="M 24 182 Q 88 171 152 182 L 152 195 L 24 195 Z"
                      fill="#000000"
                    />

                    {/* 5. Ta-Dum Spectrum Fracture Overlay (Reveals multi-colored vertical laser strips) */}
                    {isTaDum && (
                      <g className="animate-pulse" style={{ mixBlendMode: 'color-dodge' }}>
                        <rect x="28" y="18" width="124" height="166" fill="url(#spectrumVerticalPattern)" opacity="0.8" />
                      </g>
                    )}
                  </svg>

                  {/* Shimmer sweep flare across the ribbon */}
                  <motion.div
                    className="absolute inset-0 pointer-events-none"
                    initial={{ x: '-120%', opacity: 0 }}
                    animate={{
                      x: stage === 'ribbon-reveal' || isTaDum ? '180%' : '-120%',
                      opacity: [0, 0.85, 0],
                    }}
                    transition={{ duration: 1.1, ease: 'easeInOut' }}
                    style={{
                      background:
                        'linear-gradient(110deg, transparent 20%, rgba(255,255,255,0.6) 45%, rgba(229,62,156,0.8) 50%, rgba(123,47,247,0.7) 55%, transparent 75%)',
                      transform: 'skewX(-25deg)',
                      mixBlendMode: 'screen',
                    }}
                  />
                </div>

                {/* BUILDBYTES Wordmark in Netflix Bebas Neue Typography */}
                <div className="relative overflow-hidden py-1 px-4">
                  <motion.h1
                    initial={{ opacity: 0, y: 12, letterSpacing: '0.08em' }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      letterSpacing: isTaDum ? '0.18em' : '0.12em',
                    }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    className="font-display text-4xl sm:text-6xl md:text-7xl font-extrabold uppercase text-[#ECEAF5] tracking-widest leading-none drop-shadow-[0_4px_30px_rgba(0,0,0,0.9)]"
                  >
                    BUILD<span className="bg-gradient-to-r from-[#E50914] via-[#E53E9C] to-[#7B2FF7] bg-clip-text text-transparent">BYTES</span>
                  </motion.h1>

                  {/* Subtle Netflix curved bottom arc for typography */}
                  <div 
                    className="w-full h-2 mt-1 mx-auto bg-gradient-to-r from-transparent via-[#E53E9C]/60 to-transparent rounded-full blur-[1px]"
                    style={{
                      clipPath: 'ellipse(50% 60% at 50% 0%)',
                    }}
                  />
                </div>

                {/* Subtitle Card */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isTaDum ? 1 : 0.7 }}
                  transition={{ duration: 0.5 }}
                  className="mt-3 font-mono text-[10px] sm:text-xs text-[#8A84A3] tracking-[0.3em] uppercase"
                >
                  AUTOMATION STUDIO // ORIGINAL
                </motion.p>
              </motion.div>
            )}

            {/* --- STAGE 3: 3D LIGHT RIBBON HYPERSPACE TUNNEL (CANVAS) --- */}
            <canvas
              ref={canvasRef}
              className={`absolute inset-0 z-15 pointer-events-none transition-opacity duration-500 ${
                stage === 'warp-speed' || stage === 'fade-out' ? 'opacity-100' : 'opacity-0'
              }`}
            />

            {/* --- CONTROLS: "SKIP INTRO" + SOUND TOGGLE --- */}
            <div className="absolute bottom-6 right-6 sm:bottom-8 sm:right-8 z-40 flex items-center space-x-3 pointer-events-auto">
              {/* Skip Intro Button */}
              <button
                id="skip-netflix-intro-btn"
                onClick={handleSkip}
                className="group relative flex items-center space-x-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded bg-black/60 hover:bg-black/90 text-[#ECEAF5] hover:text-white border border-[#4E4861]/70 hover:border-white/80 backdrop-blur-md transition-all duration-200 text-xs sm:text-sm font-sans font-medium uppercase tracking-wider shadow-2xl active:scale-95 cursor-pointer"
                aria-label="Skip Intro"
              >
                <span>Skip Intro</span>
                <span className="hidden sm:inline text-[10px] font-mono text-[#8A84A3] border border-[#3E3852] rounded px-1.5 py-0.5 group-hover:border-white/40">
                  SPACE
                </span>
              </button>
            </div>

            {/* Sound Toggle (Top Right) */}
            <div className="absolute top-6 right-6 sm:top-8 sm:right-8 z-40 flex items-center space-x-2">
              <button
                onClick={toggleSound}
                className="flex items-center space-x-2 px-3 py-1.5 rounded-full bg-[#15121F]/80 hover:bg-[#252038] border border-[#29233B] text-[#ECEAF5] hover:text-white transition-all text-xs font-mono backdrop-blur-md shadow-lg"
                title={soundEnabled ? 'Mute Sound' : 'Enable Sound'}
                aria-label="Toggle Sound"
              >
                {soundEnabled ? (
                  <>
                    <Volume2 className="w-3.5 h-3.5 text-[#E53E9C] animate-pulse" />
                    <span className="text-[11px] text-[#ECEAF5] tracking-wider hidden xs:inline">TA-DUM [ON]</span>
                  </>
                ) : (
                  <>
                    <VolumeX className="w-3.5 h-3.5 text-[#8A84A3]" />
                    <span className="text-[11px] text-[#8A84A3] tracking-wider hidden xs:inline">MUTED</span>
                  </>
                )}
              </button>
            </div>

            {/* Bottom Left Status Telemetry */}
            <div className="absolute bottom-6 left-6 sm:bottom-8 sm:left-8 z-40 hidden md:flex items-center space-x-2 text-[10px] font-mono text-[#8A84A3]/60 select-none">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#E50914] animate-ping" />
              <span className="text-[#ECEAF5]/70">BUILDBYTES CINEMATIC INTRO</span>
              <span className="text-[#4E4861]">|</span>
              <span className="text-[#8A84A3]/50">4K HDR // DOLBY ATMOS SIM</span>
            </div>
          </>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
