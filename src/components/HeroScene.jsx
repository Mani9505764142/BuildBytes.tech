import React from 'react';
import { ArrowDown, ArrowUpRight, Play, CheckCircle2 } from 'lucide-react';
import logoImg from '../assets/logo.png';
import { buildbytesData } from '../data/buildbytesData';

export default function HeroScene() {
  const { brand } = buildbytesData;

  const handleScroll = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="hero" 
      className="relative min-h-screen flex flex-col justify-center items-center px-4 sm:px-6 md:px-12 py-28 sm:py-36 overflow-hidden"
      aria-label="Scene 01 — Opening Title Card"
    >
      {/* Background Spotlight Radial Glow behind Logo */}
      <div className="absolute inset-0 pointer-events-none -z-10 flex items-center justify-center">
        {/* Subtle radial spotlight using purple-to-magenta gradient at low opacity */}
        <div className="w-[650px] h-[500px] sm:w-[850px] sm:h-[600px] bg-gradient-to-tr from-[#7B2FF7]/18 via-[#E53E9C]/12 to-transparent blur-[140px] rounded-full transform -translate-y-12" />
        <div className="absolute w-[400px] h-[300px] bg-[#4F6EF7]/10 blur-[120px] rounded-full transform translate-x-32 translate-y-24" />
        
        {/* Subtle horizontal light streak */}
        <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#7B2FF7]/20 to-transparent" />
      </div>

      {/* Thin Scene Counter in corner (Desktop/Tablet) */}
      <div className="hidden sm:flex absolute top-20 sm:top-24 right-6 sm:right-12 font-mono text-[11px] sm:text-xs text-[#8A84A3] tracking-cinema-wide items-center space-x-2 border border-[#29233B] px-3 py-1 rounded-md bg-[#15121F]/70 backdrop-blur-sm">
        <span className="w-1.5 h-1.5 rounded-full bg-[#E53E9C] animate-pulse" />
        <span className="text-[#ECEAF5] font-semibold">SCENE 01 / 07</span>
        <span className="text-[#4F6EF7]">• TITLE CARD</span>
      </div>

      {/* Main Title Card Content */}
      <div className="max-w-5xl w-full mx-auto text-center relative z-10 flex flex-col items-center">
        
        {/* Top Eyebrow Badge: BUILDBYTES STUDIO // AUTONOMOUS WORKFLOWS */}
        <div className="mb-6 inline-flex items-center space-x-1.5 sm:space-x-2 px-3 sm:px-3.5 py-1.5 rounded-full bg-[#15121F]/90 border border-[#29233B] hover:border-[#4F6EF7]/50 shadow-[0_0_20px_rgba(79,110,247,0.15)] text-[9px] xs:text-[10px] sm:text-xs font-mono text-[#8A84A3] transition-colors cursor-default backdrop-blur-sm max-w-[92vw] flex-wrap justify-center">
          <span className="w-1.5 h-1.5 rounded-full bg-[#4F6EF7] animate-pulse shrink-0" />
          <span className="text-[#ECEAF5] font-semibold tracking-wider whitespace-nowrap">BUILDBYTES STUDIO</span>
          <span className="text-[#8A84A3]/60">//</span>
          <span className="tracking-wide whitespace-nowrap">AUTONOMOUS WORKFLOWS</span>
        </div>

        {/* Center Hero Logo with Spotlight Glow */}
        <div className="relative mb-6 sm:mb-8 group flex items-center justify-center">
          {/* Spotlight glow ring directly behind logo */}
          <div className="absolute -inset-4 bg-gradient-to-tr from-[#7B2FF7]/35 to-[#E53E9C]/25 rounded-full blur-2xl group-hover:scale-110 transition-transform duration-700 pointer-events-none" />
          
          <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-full p-2 bg-[#15121F]/80 border border-[#3E3559]/60 shadow-[0_0_40px_rgba(123,47,247,0.35)] flex items-center justify-center overflow-hidden">
            <img
              src={logoImg}
              alt="BuildBytes Circular Logo"
              className="w-full h-full object-contain rounded-full transform group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>

        {/* Cinematic Headline Title */}
        <h1 className="font-display font-condensed text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-[#ECEAF5] font-extrabold uppercase leading-[0.95] drop-shadow-[0_10px_35px_rgba(0,0,0,0.85)] max-w-4xl">
          We build the automation your business is <span className="bg-gradient-to-r from-[#7B2FF7] via-[#E53E9C] to-[#4F6EF7] bg-clip-text text-transparent">missing.</span>
        </h1>

        {/* Subline */}
        <p className="mt-6 sm:mt-8 text-base sm:text-xl md:text-2xl text-[#8A84A3] max-w-3xl mx-auto font-sans font-light leading-relaxed">
          {brand.subline}
        </p>

        {/* Two Action Buttons */}
        <div className="mt-10 sm:mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
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
            className="w-full sm:w-auto px-7 py-4 rounded-xl bg-[#15121F] hover:bg-[#1D192B] text-[#ECEAF5] hover:text-[#4F6EF7] border border-[#29233B] hover:border-[#4F6EF7]/60 font-semibold text-sm tracking-wider uppercase font-mono flex items-center justify-center space-x-2.5 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <Play size={15} className="fill-current text-[#4F6EF7]" />
            <span>See proof of work</span>
          </button>
        </div>

        {/* Key Operational Highlights */}
        <div className="mt-12 flex flex-wrap justify-center items-center gap-3 sm:gap-6 text-xs font-mono text-[#8A84A3]">
          <span className="flex items-center space-x-1.5">
            <CheckCircle2 size={13} className="text-[#4F6EF7]" />
            <span>Zero manual data entry</span>
          </span>
          <span className="text-[#29233B] hidden sm:inline">•</span>
          <span className="flex items-center space-x-1.5">
            <CheckCircle2 size={13} className="text-[#E53E9C]" />
            <span>Production n8n + Playwright pipelines</span>
          </span>
          <span className="text-[#29233B] hidden sm:inline">•</span>
          <span className="flex items-center space-x-1.5">
            <CheckCircle2 size={13} className="text-[#7B2FF7]" />
            <span>Local & International Clients</span>
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
