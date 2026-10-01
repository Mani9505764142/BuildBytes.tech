import React, { useState } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import logoImg from '../assets/logo.png';

export default function BuildBytesNavbar({ activeScene }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'hero', number: '01', name: 'TITLE' },
    { id: 'problem', number: '02', name: 'PROBLEMS' },
    { id: 'services', number: '03', name: 'SERVICES' },
    { id: 'industries', number: '04', name: 'INDUSTRIES' },
    { id: 'proof', number: '05', name: 'PROOF' },
    { id: 'process', number: '06', name: 'PROCESS' },
    { id: 'contact', number: '07', name: 'CONTACT' },
  ];

  const handleScroll = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-6 sm:top-8 left-0 right-0 z-40 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto pointer-events-none">
      <div className="bg-[#15121F]/90 backdrop-blur-md border border-[#29233B] rounded-2xl px-4 py-2.5 flex items-center justify-between shadow-2xl pointer-events-auto">
        
        {/* Actual Logo Badge + Brand Wordmark */}
        <a 
          href="#hero" 
          onClick={(e) => { e.preventDefault(); handleScroll('hero'); }}
          className="group flex items-center space-x-3 focus:outline-none"
        >
          {/* Actual Logo Image */}
          <div className="relative w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center">
            <img
              src={logoImg}
              alt="BuildBytes Logo"
              className="w-full h-full object-contain rounded-full drop-shadow-[0_0_12px_rgba(123,47,247,0.4)] group-hover:scale-105 transition-transform"
            />
          </div>

          <div className="flex flex-col">
            <div className="flex items-center space-x-1">
              <span className="font-display font-condensed tracking-wider text-lg sm:text-xl font-bold text-[#ECEAF5] leading-none">
                BUILD<span className="bg-gradient-to-r from-[#7B2FF7] to-[#E53E9C] bg-clip-text text-transparent">BYTES</span>
              </span>
            </div>
            <span className="text-[10px] font-mono text-[#8A84A3] hidden xs:block tracking-wide">
              AUTOMATION STUDIO
            </span>
          </div>
        </a>

        {/* Desktop Scene Navigation */}
        <nav className="hidden lg:flex items-center space-x-1" aria-label="Scene navigation">
          {navLinks.map((link) => {
            const isSelected = activeScene === parseInt(link.number, 10);
            return (
              <button
                key={link.id}
                onClick={() => handleScroll(link.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all flex items-center space-x-1.5 ${
                  isSelected
                    ? 'bg-[#1D192B] text-[#E53E9C] border border-[#E53E9C]/40 shadow-[0_0_12px_rgba(229,62,156,0.15)] font-semibold'
                    : 'text-[#8A84A3] hover:text-[#ECEAF5] hover:bg-[#0B0A14]/60 border border-transparent'
                }`}
                aria-current={isSelected ? 'true' : undefined}
              >
                <span className={`text-[10px] ${isSelected ? 'text-[#E53E9C]' : 'text-[#4F6EF7]'}`}>
                  {link.number}
                </span>
                <span>{link.name}</span>
              </button>
            );
          })}
        </nav>

        {/* Right CTA Button */}
        <div className="flex items-center space-x-3">
          <button
            onClick={() => handleScroll('contact')}
            className="hidden sm:inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#7B2FF7] to-[#E53E9C] hover:from-[#8C47F8] hover:to-[#EA54A8] text-[#ECEAF5] text-xs font-mono font-bold tracking-wider uppercase shadow-[0_0_20px_rgba(123,47,247,0.3)] hover:shadow-[0_0_30px_rgba(229,62,156,0.45)] transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
          >
            <span>BOOK A DEMO</span>
            <ArrowUpRight size={14} />
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl bg-[#0B0A14] border border-[#29233B] text-[#8A84A3] hover:text-[#ECEAF5]"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-2 bg-[#15121F]/95 backdrop-blur-xl border border-[#29233B] rounded-2xl p-4 shadow-2xl pointer-events-auto space-y-2">
          <div className="text-[10px] font-mono text-[#8A84A3] border-b border-[#29233B] pb-2 flex justify-between">
            <span>SCENE SELECTOR</span>
            <span className="text-[#4F6EF7]">7 SCENES TOTAL</span>
          </div>

          <div className="grid grid-cols-1 gap-1 pt-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleScroll(link.id)}
                className={`w-full text-left px-3 py-2 rounded-xl text-xs font-mono flex items-center justify-between transition-colors ${
                  activeScene === parseInt(link.number, 10)
                    ? 'bg-[#1D192B] text-[#E53E9C] border border-[#E53E9C]/40 font-semibold'
                    : 'text-[#ECEAF5] hover:bg-[#0B0A14]'
                }`}
              >
                <span>SCENE {link.number} — {link.name}</span>
                <span className="text-[10px] text-[#4F6EF7]">JUMP →</span>
              </button>
            ))}
          </div>

          <div className="pt-2 border-t border-[#29233B]">
            <button
              onClick={() => handleScroll('contact')}
              className="w-full text-center py-2.5 bg-gradient-to-r from-[#7B2FF7] to-[#E53E9C] text-[#ECEAF5] text-xs font-mono font-bold rounded-xl transition-all block tracking-wider uppercase shadow-lg cursor-pointer"
            >
              BOOK A FREE DEMO
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
