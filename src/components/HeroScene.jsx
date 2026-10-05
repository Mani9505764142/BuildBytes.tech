import React, { useState } from 'react';
import { 
  ArrowDown, 
  ArrowUpRight, 
  Play, 
  CheckCircle2, 
  Eye, 
  EyeOff, 
  Globe, 
  ShoppingBag, 
  Bot, 
  Cpu, 
  Video,
  Sparkles
} from 'lucide-react';
import logoImg from '../assets/logo.png';
import { buildbytesData } from '../data/buildbytesData';
import HeroVantaVFX from './HeroVantaVFX';

export default function HeroScene() {
  const { brand } = buildbytesData;
  const [showVfx, setShowVfx] = useState(true);
  const [activeDomain, setActiveDomain] = useState('all');
  const [videoFeed, setVideoFeed] = useState('montage');

  const handleScroll = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const domainPillars = [
    { id: 'web', name: 'Web & SaaS Apps', icon: Globe, metric: 'React / Next.js • 99.9% Uptime', color: '#4F6EF7' },
    { id: 'commerce', name: 'E-Commerce', icon: ShoppingBag, metric: 'Stripe / Shopify • Zero-Drop Cart', color: '#E53E9C' },
    { id: 'ai', name: 'Cognitive AI & RAG', icon: Bot, metric: 'Vector DBs • 0 Hallucinations', color: '#7B2FF7' },
    { id: 'auto', name: 'Automations & SEO', icon: Cpu, metric: 'n8n • Google Lighthouse 100', color: '#00F0FF' },
  ];

  const videoFeeds = [
    { id: 'montage', label: '🎬 MASTER MONTAGE', src: '/hero-people-work.mp4', desc: '4-Scene Studio, Dev Rig & Agile Sprint Dynamic Loop' },
    { id: 'studio', label: '🏢 STUDIO LOFT', src: '/video_918.mp4', desc: 'Active 2-Story Collaborative Tech Studio Floor' },
    { id: 'code', label: '💻 DEV RIG & CODE', src: '/video_41642.mp4', desc: 'Software Engineer Actively Writing Code in VS Code' },
    { id: 'sprint', label: '👥 AGILE SPRINT', src: '/video_23207.mp4', desc: 'Engineers Presenting App Architecture & Wireframes' },
  ];

  const currentFeed = videoFeeds.find((f) => f.id === videoFeed) || videoFeeds[0];

  return (
    <section 
      id="hero" 
      className="relative min-h-screen flex flex-col justify-center items-center px-4 sm:px-6 md:px-12 py-28 sm:py-36 overflow-hidden"
      aria-label="Scene 01 — Opening Title Card"
    >
      {/* 1. CINEMATIC REAL-PEOPLE VIDEO BACKGROUND: Real Human Movement in Modern Software Studio */}
      <div className="absolute inset-0 -z-30 overflow-hidden pointer-events-none select-none">
        <video
          key={currentFeed.src}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover opacity-50 filter brightness-95 contrast-125 saturate-125 transition-opacity duration-700"
          poster="/images/hero-ecosystem.jpg"
        >
          <source src={currentFeed.src} type="video/mp4" />
        </video>
        
        {/* Cinematic multi-layered gradient masks blending into #0B0A14 base */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B0A14] via-[#0B0A14]/55 to-[#0B0A14]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B0A14]/90 via-transparent to-[#0B0A14]/90" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#0B0A14]/65 to-[#0B0A14]" />
        
        {/* Subtle anamorphic purple/magenta cinema grade wash */}
        <div className="absolute inset-0 bg-gradient-to-tr from-[#7B2FF7]/15 via-transparent to-[#E53E9C]/10 mix-blend-color-dodge" />
      </div>

      {/* 2. DYNAMIC 3D CYBER NETWORK & VANTA-STYLE KINETIC VFX LAYER */}
      {showVfx && <HeroVantaVFX />}

      {/* 3. BACKGROUND SPOTLIGHT RADIAL GLOWS */}
      <div className="absolute inset-0 pointer-events-none -z-10 flex items-center justify-center">
        <div className="w-[650px] h-[500px] sm:w-[900px] sm:h-[650px] bg-gradient-to-tr from-[#7B2FF7]/22 via-[#E53E9C]/16 to-transparent blur-[140px] rounded-full transform -translate-y-12" />
        <div className="absolute w-[450px] h-[350px] bg-[#4F6EF7]/15 blur-[120px] rounded-full transform translate-x-32 translate-y-24" />
        <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#7B2FF7]/35 to-transparent" />
      </div>

      {/* 4. TELEMETRY BADGE & VIDEO FEED CONTROLLER */}
      <div className="hidden sm:flex absolute top-20 sm:top-24 right-6 sm:right-12 font-mono text-[11px] sm:text-xs text-[#8A84A3] tracking-cinema-wide items-center space-x-2 border border-[#29233B] px-3 py-1 rounded-md bg-[#15121F]/85 backdrop-blur-md shadow-lg z-20">
        <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF] animate-ping" />
        <span className="text-[#ECEAF5] font-semibold">SCENE 01 / 07</span>
        <span className="text-[#00F0FF]">• LIVE STUDIO</span>
        <span className="text-[#3E3559]">|</span>
        <button
          onClick={() => setShowVfx(!showVfx)}
          className="hover:text-white flex items-center space-x-1 cursor-pointer transition-colors"
          title={showVfx ? "Disable 3D Dynamic VFX" : "Enable 3D Dynamic VFX"}
        >
          {showVfx ? (
            <>
              <Eye size={12} className="text-[#00F0FF]" />
              <span className="text-[10px] text-[#00F0FF]">VFX [ACTIVE]</span>
            </>
          ) : (
            <>
              <EyeOff size={12} className="text-[#8A84A3]" />
              <span className="text-[10px]">VFX [OFF]</span>
            </>
          )}
        </button>
      </div>

      {/* 5. MAIN HERO TITLE CARD CONTENT */}
      <div className="max-w-5xl w-full mx-auto text-center relative z-10 flex flex-col items-center">
        
        {/* Top Eyebrow Badge: FULL-SPECTRUM SOFTWARE STUDIO */}
        <div className="mb-6 inline-flex items-center space-x-1.5 sm:space-x-2 px-3 sm:px-4 py-1.5 rounded-full bg-[#15121F]/90 border border-[#29233B] hover:border-[#4F6EF7]/50 shadow-[0_0_25px_rgba(79,110,247,0.2)] text-[9px] xs:text-[10px] sm:text-xs font-mono text-[#8A84A3] transition-colors cursor-default backdrop-blur-md max-w-[92vw] flex-wrap justify-center">
          <span className="w-1.5 h-1.5 rounded-full bg-[#4F6EF7] animate-pulse shrink-0" />
          <span className="text-[#ECEAF5] font-semibold tracking-wider whitespace-nowrap">BUILDBYTES STUDIO</span>
          <span className="text-[#8A84A3]/60">//</span>
          <span className="tracking-wide text-[#ECEAF5]/90 whitespace-nowrap">WEB APPS • COMMERCE • AI & AUTOMATIONS</span>
        </div>

        {/* Center Hero Logo with Spotlight Glow */}
        <div className="relative mb-6 sm:mb-8 group flex items-center justify-center">
          <div className="absolute -inset-4 bg-gradient-to-tr from-[#7B2FF7]/40 via-[#E53E9C]/30 to-[#4F6EF7]/20 rounded-full blur-2xl group-hover:scale-110 transition-transform duration-700 pointer-events-none" />
          
          <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-full p-2 bg-[#15121F]/85 border border-[#3E3559]/70 shadow-[0_0_40px_rgba(123,47,247,0.4)] flex items-center justify-center overflow-hidden backdrop-blur-sm">
            <img
              src={logoImg}
              alt="BuildBytes Circular Logo"
              className="w-full h-full object-contain rounded-full transform group-hover:scale-105 transition-transform duration-500 drop-shadow-[0_0_15px_rgba(123,47,247,0.5)]"
            />
          </div>
        </div>

        {/* Comprehensive Cinematic Headline Title */}
        <h1 className="font-display font-condensed text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-[#ECEAF5] font-extrabold uppercase leading-[0.95] drop-shadow-[0_10px_35px_rgba(0,0,0,0.9)] max-w-4xl">
          We engineer the software, web platforms & AI your business is <span className="bg-gradient-to-r from-[#7B2FF7] via-[#E53E9C] to-[#4F6EF7] bg-clip-text text-transparent">missing.</span>
        </h1>

        {/* Comprehensive Subline reflecting All Services */}
        <p className="mt-6 sm:mt-8 text-base sm:text-xl md:text-2xl text-[#8A84A3] max-w-3xl mx-auto font-sans font-light leading-relaxed">
          From high-performance React & Next.js web applications and conversion-tuned e-commerce to domain-specific RAG AI systems and autonomous 24/7 background pipelines.
        </p>

        {/* Interactive 4-Pillar Digital Ecosystem Badges */}
        <div className="mt-8 flex flex-wrap justify-center items-center gap-2 sm:gap-3 max-w-3xl">
          {domainPillars.map((domain) => {
            const Icon = domain.icon;
            const isHovered = activeDomain === domain.id;
            return (
              <div
                key={domain.id}
                onMouseEnter={() => setActiveDomain(domain.id)}
                onMouseLeave={() => setActiveDomain('all')}
                onClick={() => handleScroll('services')}
                className={`group px-3 py-1.5 rounded-xl border transition-all duration-300 flex items-center space-x-2 text-xs font-mono backdrop-blur-md cursor-pointer ${
                  isHovered
                    ? 'bg-[#1D192B] border-[#E53E9C] shadow-[0_0_15px_rgba(229,62,156,0.25)] -translate-y-0.5'
                    : 'bg-[#15121F]/80 border-[#29233B] hover:border-[#4F6EF7]/50 text-[#8A84A3]'
                }`}
              >
                <Icon size={14} style={{ color: domain.color }} />
                <span className="text-[#ECEAF5] font-medium">{domain.name}</span>
                <span className="text-[10px] text-[#8A84A3] hidden md:inline">
                  • {domain.metric}
                </span>
              </div>
            );
          })}
        </div>

        {/* Real Human Video Camera Angle / Feed Selector */}
        <div className="mt-7 inline-flex items-center p-1 rounded-xl bg-[#120F1D]/80 border border-[#29233B] backdrop-blur-md shadow-lg">
          <div className="hidden xs:flex items-center px-2 py-1 text-[10px] font-mono text-[#8A84A3] space-x-1.5 border-r border-[#29233B] mr-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E53E9C] animate-pulse" />
            <span className="text-[#ECEAF5]">CAMERA FEED:</span>
          </div>
          <div className="flex items-center space-x-1">
            {videoFeeds.map((feed) => (
              <button
                key={feed.id}
                onClick={() => setVideoFeed(feed.id)}
                title={feed.desc}
                className={`px-2.5 py-1 rounded-lg text-[10px] sm:text-[11px] font-mono transition-all cursor-pointer ${
                  videoFeed === feed.id
                    ? 'bg-gradient-to-r from-[#7B2FF7]/40 to-[#E53E9C]/40 text-[#ECEAF5] border border-[#00F0FF]/50 shadow-[0_0_12px_rgba(0,240,255,0.25)]'
                    : 'text-[#8A84A3] hover:text-[#ECEAF5] hover:bg-[#1D192B]/60'
                }`}
              >
                {feed.label}
              </button>
            ))}
          </div>
        </div>

        {/* Two Primary Action Buttons */}
        <div className="mt-9 sm:mt-11 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
          {/* Button 1: Book a free demo */}
          <button
            onClick={() => handleScroll('contact')}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-[#7B2FF7] to-[#E53E9C] hover:from-[#8C47F8] hover:to-[#EA54A8] text-[#ECEAF5] font-bold text-sm tracking-wider uppercase font-mono flex items-center justify-center space-x-2.5 shadow-[0_0_30px_rgba(123,47,247,0.35)] hover:shadow-[0_0_40px_rgba(229,62,156,0.5)] transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
          >
            <span>Book a free demo</span>
            <ArrowUpRight size={16} />
          </button>

          {/* Button 2: See proof of work */}
          <button
            onClick={() => handleScroll('proof')}
            className="w-full sm:w-auto px-7 py-4 rounded-xl bg-[#15121F]/90 hover:bg-[#1D192B] text-[#ECEAF5] hover:text-[#4F6EF7] border border-[#29233B] hover:border-[#4F6EF7]/60 font-semibold text-sm tracking-wider uppercase font-mono flex items-center justify-center space-x-2.5 transition-all transform hover:-translate-y-0.5 active:translate-y-0 backdrop-blur-md cursor-pointer"
          >
            <Play size={15} className="fill-current text-[#4F6EF7]" />
            <span>See proof of work</span>
          </button>
        </div>

        {/* Operational Highlights across Software & AI */}
        <div className="mt-12 flex flex-wrap justify-center items-center gap-3 sm:gap-6 text-xs font-mono text-[#8A84A3]">
          <span className="flex items-center space-x-1.5">
            <CheckCircle2 size={13} className="text-[#4F6EF7]" />
            <span>Full-Stack Web & SaaS</span>
          </span>
          <span className="text-[#29233B] hidden sm:inline">•</span>
          <span className="flex items-center space-x-1.5">
            <CheckCircle2 size={13} className="text-[#E53E9C]" />
            <span>RAG AI & Vector Engines</span>
          </span>
          <span className="text-[#29233B] hidden sm:inline">•</span>
          <span className="flex items-center space-x-1.5">
            <CheckCircle2 size={13} className="text-[#7B2FF7]" />
            <span>Autonomous n8n Pipelines</span>
          </span>
        </div>

        {/* Scroll Indicator */}
        <div 
          onClick={() => handleScroll('problem')}
          className="mt-14 sm:mt-16 flex flex-col items-center space-y-2 text-[#8A84A3]/60 hover:text-[#4F6EF7] transition-colors cursor-pointer"
        >
          <span className="text-[10px] font-mono tracking-cinema-wide uppercase">EXPLORE BOTTLENECKS (SCENE 02)</span>
          <ArrowDown size={16} className="animate-bounce text-[#4F6EF7]" />
        </div>

      </div>
    </section>
  );
}
