import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';
import { netflixAudio } from '../utils/netflixSound';

export default function OpeningSequence({ onComplete }) {
  // Stages: 'intro-card' -> 'ribbon-reveal' -> 'ta-dum' -> 'warp-speed' -> 'fade-out' -> 'done'
  const [stage, setStage] = useState('intro-card');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [audioTriggered, setAudioTriggered] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const canvasRef = useRef(null);
  const animFrameRef = useRef(null);

  // Trigger audio safely on user interaction or timer
  const triggerAudio = () => {
    if (!audioTriggered && soundEnabled) {
      setAudioTriggered(true);
      netflixAudio.playIntroAtmosphere();
      netflixAudio.playTaDum();
    }
  };

  useEffect(() => {
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
  }, [onComplete]);

  // Keyboard shortcut listener (Space or Esc to skip)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'Space' || e.code === 'Escape' || e.code === 'Enter') {
        e.preventDefault();
        handleSkip();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSkip = () => {
    netflixAudio.stopAllAudio(0.1);
    setStage('done');
    onComplete?.();
  };

  const toggleSound = (e) => {
    e.stopPropagation();
    const nextState = !soundEnabled;
    setSoundEnabled(nextState);
    netflixAudio.setMuted(!nextState);
    if (nextState && !audioTriggered) {
      triggerAudio();
    }
  };

  const handleContainerClick = () => {
    setHasInteracted(true);
    triggerAudio();
  };

  // Canvas 3D Light Ribbon Tunnel Animation (Hyper-drive spectrum zoom)
  useEffect(() => {
    if (stage !== 'warp-speed' && stage !== 'fade-out') return;

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

    // Spectrum colors matching Netflix + BuildBytes hybrid palette:
    // Crimson, Neon Magenta, Deep Purple, Electric Blue, Cyan, Amber, White
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

    // Generate 3D light ribbon beams
    const ribbonCount = 95;
    const ribbons = [];

    for (let i = 0; i < ribbonCount; i++) {
      const angle = (i / ribbonCount) * Math.PI * 2 + (Math.random() - 0.5) * 0.4;
      // Distribute more horizontally to emulate the letter ribbon expansion
      const spreadX = Math.cos(angle) * (180 + Math.random() * 420);
      const spreadY = Math.sin(angle) * (120 + Math.random() * 320);

      ribbons.push({
        x: spreadX,
        y: spreadY,
        z: Math.random() * 1200 + 100, // Depth from 100 to 1300
        length: 220 + Math.random() * 380,
        thickness: 1.5 + Math.random() * 4.5,
        speed: 28 + Math.random() * 26,
        color: spectrumColors[i % spectrumColors.length],
        alpha: 0.8 + Math.random() * 0.2,
      });
    }

    // Particle dust embers
    const dustCount = 50;
    const dust = [];
    for (let i = 0; i < dustCount; i++) {
      dust.push({
        x: (Math.random() - 0.5) * width * 1.5,
        y: (Math.random() - 0.5) * height * 1.5,
        z: Math.random() * 1000,
        size: 1 + Math.random() * 2.5,
        color: spectrumColors[i % spectrumColors.length],
      });
    }

    let startTime = performance.now();
    const focalLength = 320;

    const render = (now) => {
      const elapsed = (now - startTime) / 1000;
      ctx.clearRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;

      // Dark translucent trail for motion blur
      ctx.fillStyle = 'rgba(5, 4, 10, 0.28)';
      ctx.fillRect(0, 0, width, height);

      // Accelerating zoom factor
      const speedMultiplier = Math.min(3.2, 1 + elapsed * 1.8);

      // Render 3D light ribbons
      ribbons.forEach((ribbon) => {
        // Move towards camera
        ribbon.z -= ribbon.speed * speedMultiplier;

        // Loop ribbons continuously until fade-out
        if (ribbon.z <= -focalLength + 10) {
          ribbon.z = 1200;
          const angle = Math.random() * Math.PI * 2;
          ribbon.x = Math.cos(angle) * (180 + Math.random() * 420);
          ribbon.y = Math.sin(angle) * (120 + Math.random() * 320);
        }

        // 3D perspective projection
        const scale = focalLength / (focalLength + ribbon.z);
        if (scale <= 0) return;

        const screenX = centerX + ribbon.x * scale;
        const screenY = centerY + ribbon.y * scale;

        // Tail point projected in distance to form streaming beam
        const tailZ = ribbon.z + ribbon.length * speedMultiplier;
        const tailScale = focalLength / (focalLength + tailZ);
        const tailX = centerX + ribbon.x * tailScale;
        const tailY = centerY + ribbon.y * tailScale;

        // Fade ribbons as they rush right past the lens
        let beamAlpha = ribbon.alpha;
        if (ribbon.z < 100) {
          beamAlpha = Math.max(0, ribbon.z / 100);
        }

        // Draw luminous light beam
        const gradient = ctx.createLinearGradient(tailX, tailY, screenX, screenY);
        const c = ribbon.color;
        gradient.addColorStop(0, `rgba(${c.r}, ${c.g}, ${c.b}, 0)`);
        gradient.addColorStop(0.65, `rgba(${c.r}, ${c.g}, ${c.b}, ${beamAlpha * 0.75})`);
        gradient.addColorStop(1, `rgba(255, 255, 255, ${beamAlpha})`);

        ctx.beginPath();
        ctx.strokeStyle = gradient;
        ctx.lineWidth = Math.max(1, ribbon.thickness * scale * 2.2);
        ctx.lineCap = 'round';
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(screenX, screenY);
        ctx.stroke();

        // Luminous glowing head point
        if (scale > 0.4) {
          ctx.beginPath();
          ctx.fillStyle = `rgba(255, 255, 255, ${beamAlpha * 0.9})`;
          ctx.arc(screenX, screenY, Math.max(1.5, ribbon.thickness * scale * 0.8), 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // Render floating sparks & cosmic dust
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

      // Anamorphic horizontal lens flare across center screen
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

        // Radial bloom at center core
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
  }, [stage]);

  if (stage === 'done') {
    return null;
  }

  // Camera shake calculation during 'ta-dum' impact
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
        onClick={handleContainerClick}
        role="region"
        aria-label="Netflix Style Intro Sequence"
      >
        {/* Cinematic Letterbox Bars */}
        <div className="absolute top-0 inset-x-0 h-10 sm:h-14 bg-black z-30 pointer-events-none border-b border-[#1A1629]/50 shadow-2xl" />
        <div className="absolute bottom-0 inset-x-0 h-10 sm:h-14 bg-black z-30 pointer-events-none border-t border-[#1A1629]/50 shadow-2xl" />

        {/* Ambient Dark Background Glow */}
        <div className="absolute inset-0 bg-radial-gradient from-[#1a0f2e]/60 via-[#05040a]/90 to-[#000000] pointer-events-none" />

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

            {/* Subtitle Card: "STUDIO & BUSINESS AUTOMATION" */}
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

        {/* --- NETFLIX AUTHENTIC CONTROLS: "SKIP INTRO" + SOUND TOGGLE --- */}
        <div className="absolute bottom-6 right-6 sm:bottom-8 sm:right-8 z-40 flex items-center space-x-3 pointer-events-auto">
          {/* Netflix-Authentic Skip Intro Button */}
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
      </motion.div>
    </AnimatePresence>
  );
}
