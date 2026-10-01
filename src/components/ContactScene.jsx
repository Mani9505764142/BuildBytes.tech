import React, { useState } from 'react';
import { Mail, Phone, Copy, Check, ArrowUp, ArrowUpRight, Clapperboard, Calendar } from 'lucide-react';
import logoImg from '../assets/logo.png';
import { buildbytesData } from '../data/buildbytesData';

export default function ContactScene() {
  const { contact } = buildbytesData;
  const [copiedKey, setCopiedKey] = useState(null);

  const handleCopy = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const handleScrollTop = () => {
    const el = document.getElementById('hero');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="contact" 
      className="relative min-h-screen py-24 sm:py-32 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto flex flex-col justify-center"
      aria-label="Scene 07 — Contact & Credits"
    >
      {/* Scene Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#29233B] pb-6 mb-12 sm:mb-16">
        <div>
          <div className="flex items-center space-x-2 font-mono text-xs text-[#4F6EF7] mb-2 tracking-cinema-wide uppercase">
            <span className="w-2 h-2 bg-[#E53E9C] rounded-sm" />
            <span>{contact.label}</span>
          </div>
          <h2 className="font-display font-condensed text-4xl sm:text-5xl md:text-6xl uppercase tracking-tight text-[#ECEAF5] font-bold">
            CLOSING CREDITS & CONTACT
          </h2>
        </div>

        <div className="mt-4 md:mt-0 font-mono text-xs text-[#8A84A3]">
          <span>FINAL SEQUENCE // GET IN TOUCH</span>
        </div>
      </div>

      {/* Main Grid: Closing Credits & Terminal */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left Column: Film Crew Style Credits Roll (6 cols) */}
        <div className="lg:col-span-6 bg-[#15121F] border border-[#29233B] rounded-2xl p-6 sm:p-8 shadow-2xl">
          <div className="flex items-center justify-between pb-4 border-b border-[#29233B] mb-6">
            <div className="flex items-center space-x-2 font-mono text-xs text-[#E53E9C] font-bold tracking-wider">
              <Clapperboard size={16} />
              <span>STUDIO CREDITS</span>
            </div>
            <span className="font-mono text-[10px] text-[#8A84A3]">
              SEQUENCE 07 / 07
            </span>
          </div>

          <div className="space-y-4 font-mono text-xs">
            {contact.creditsRoll.map((credit, idx) => (
              <div 
                key={idx} 
                className="flex flex-col sm:flex-row sm:items-baseline justify-between py-2 border-b border-[#29233B]/40"
              >
                <span className="text-[#8A84A3] text-[11px] uppercase tracking-wider mb-0.5 sm:mb-0">
                  {credit.role}
                </span>
                <span className="text-[#ECEAF5] font-semibold text-left sm:text-right">
                  {credit.name}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-4 border-t border-[#29233B] text-center font-mono text-[11px] text-[#4F6EF7]">
            NO GENERIC TEMPLATES • CUSTOM ARCHITECTURE FOR REAL BUSINESSES
          </div>
        </div>

        {/* Right Column: Prominent Single CTA + Contact Details (6 cols) */}
        <div className="lg:col-span-6 space-y-6">
          
          <div className="bg-[#15121F] border border-[#29233B] rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
            {/* Top Glow Accent */}
            <div className="absolute top-0 right-0 w-36 h-36 bg-gradient-to-bl from-[#E53E9C]/15 to-transparent blur-3xl pointer-events-none" />

            <span className="font-mono text-xs text-[#4F6EF7] tracking-widest uppercase block mb-2">
              DISPATCH SIGNAL // DEMO INVITATION
            </span>

            <h3 className="text-2xl sm:text-3xl font-display font-condensed uppercase font-bold text-[#ECEAF5]">
              {contact.headline}
            </h3>

            <p className="mt-2 text-sm text-[#8A84A3] font-sans leading-relaxed">
              {contact.subline}
            </p>

            {/* Single Prominent Button: Book a free demo */}
            <div className="mt-6">
              <a
                href={contact.directMailtoLink}
                className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-[#7B2FF7] to-[#E53E9C] hover:from-[#8C47F8] hover:to-[#EA54A8] text-[#ECEAF5] font-mono font-bold text-sm tracking-wider uppercase flex items-center justify-center space-x-2.5 shadow-[0_0_30px_rgba(123,47,247,0.35)] hover:shadow-[0_0_40px_rgba(229,62,156,0.5)] transition-all transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <Calendar size={18} />
                <span>Book a free demo</span>
              </a>
            </div>

            {/* Communication Coordinates */}
            <div className="mt-8 space-y-3">
              <span className="text-[10px] font-mono text-[#8A84A3] uppercase tracking-wider block">
                DIRECT INBOX & PHONE COORDINATES
              </span>

              {/* Email */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-[#0B0A14] border border-[#29233B] hover:border-[#7B2FF7]/60 transition-colors">
                <div className="flex items-center space-x-3 overflow-hidden">
                  <div className="p-2 rounded-lg bg-[#15121F] text-[#4F6EF7]">
                    <Mail size={16} />
                  </div>
                  <div className="truncate">
                    <span className="text-[10px] font-mono text-[#8A84A3] block">EMAIL</span>
                    <a 
                      href={`mailto:${contact.email}`} 
                      className="text-xs sm:text-sm font-mono text-[#ECEAF5] hover:text-[#E53E9C] transition-colors truncate block"
                    >
                      {contact.email}
                    </a>
                  </div>
                </div>
                <button
                  onClick={() => handleCopy(contact.email, 'email')}
                  className="p-2 rounded-lg bg-[#15121F] hover:bg-[#1D192B] text-[#8A84A3] hover:text-[#ECEAF5] border border-[#29233B] text-xs font-mono"
                  title="Copy email"
                  aria-label="Copy email"
                >
                  {copiedKey === 'email' ? <Check size={14} className="text-[#4F6EF7]" /> : <Copy size={14} />}
                </button>
              </div>

              {/* Phone */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-[#0B0A14] border border-[#29233B] hover:border-[#7B2FF7]/60 transition-colors">
                <div className="flex items-center space-x-3 overflow-hidden">
                  <div className="p-2 rounded-lg bg-[#15121F] text-[#E53E9C]">
                    <Phone size={16} />
                  </div>
                  <div className="truncate">
                    <span className="text-[10px] font-mono text-[#8A84A3] block">PHONE / WHATSAPP</span>
                    <a 
                      href={`tel:${contact.phone}`} 
                      className="text-xs sm:text-sm font-mono text-[#ECEAF5] hover:text-[#E53E9C] transition-colors truncate block"
                    >
                      {contact.phone}
                    </a>
                  </div>
                </div>
                <button
                  onClick={() => handleCopy(contact.phone, 'phone')}
                  className="p-2 rounded-lg bg-[#15121F] hover:bg-[#1D192B] text-[#8A84A3] hover:text-[#ECEAF5] border border-[#29233B] text-xs font-mono"
                  title="Copy phone"
                  aria-label="Copy phone"
                >
                  {copiedKey === 'phone' ? <Check size={14} className="text-[#4F6EF7]" /> : <Copy size={14} />}
                </button>
              </div>

              {/* Social Channels Header */}
              <div className="pt-2">
                <span className="text-[10px] font-mono text-[#8A84A3] uppercase tracking-wider block mb-2">
                  SOCIAL CHANNELS & PROFILES
                </span>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {/* Instagram 1: BuildBytes Tech */}
                  <a
                    href={contact.instagramBuildbytes}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-[#0B0A14] border border-[#29233B] hover:border-[#E53E9C]/60 hover:bg-[#15121F] transition-all flex items-center justify-between group"
                  >
                    <div className="flex items-center space-x-2.5 overflow-hidden">
                      <div className="p-2 rounded-lg bg-[#15121F] text-[#E53E9C] group-hover:scale-110 transition-transform">
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                        </svg>
                      </div>
                      <div className="truncate">
                        <span className="text-[9px] font-mono text-[#8A84A3] block">INSTAGRAM</span>
                        <span className="text-xs font-mono text-[#ECEAF5] group-hover:text-[#E53E9C] transition-colors truncate block">
                          {contact.instagramBuildbytesDisplay}
                        </span>
                      </div>
                    </div>
                    <ArrowUpRight size={13} className="text-[#8A84A3] group-hover:text-[#E53E9C] transition-colors shrink-0" />
                  </a>

                  {/* Instagram 2: Tiny Tale Kids */}
                  <a
                    href={contact.instagramTinyTale}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-[#0B0A14] border border-[#29233B] hover:border-[#E53E9C]/60 hover:bg-[#15121F] transition-all flex items-center justify-between group"
                  >
                    <div className="flex items-center space-x-2.5 overflow-hidden">
                      <div className="p-2 rounded-lg bg-[#15121F] text-[#E53E9C] group-hover:scale-110 transition-transform">
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                        </svg>
                      </div>
                      <div className="truncate">
                        <span className="text-[9px] font-mono text-[#8A84A3] block">INSTAGRAM</span>
                        <span className="text-xs font-mono text-[#ECEAF5] group-hover:text-[#E53E9C] transition-colors truncate block">
                          {contact.instagramTinyTaleDisplay}
                        </span>
                      </div>
                    </div>
                    <ArrowUpRight size={13} className="text-[#8A84A3] group-hover:text-[#E53E9C] transition-colors shrink-0" />
                  </a>

                  {/* Facebook */}
                  <a
                    href={contact.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-[#0B0A14] border border-[#29233B] hover:border-[#4F6EF7]/60 hover:bg-[#15121F] transition-all flex items-center justify-between group"
                  >
                    <div className="flex items-center space-x-2.5 overflow-hidden">
                      <div className="p-2 rounded-lg bg-[#15121F] text-[#4F6EF7] group-hover:scale-110 transition-transform">
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                        </svg>
                      </div>
                      <div className="truncate">
                        <span className="text-[9px] font-mono text-[#8A84A3] block">FACEBOOK</span>
                        <span className="text-xs font-mono text-[#ECEAF5] group-hover:text-[#4F6EF7] transition-colors truncate block">
                          {contact.facebookDisplay}
                        </span>
                      </div>
                    </div>
                    <ArrowUpRight size={13} className="text-[#8A84A3] group-hover:text-[#4F6EF7] transition-colors shrink-0" />
                  </a>

                  {/* LinkedIn */}
                  <a
                    href={contact.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-[#0B0A14] border border-[#29233B] hover:border-[#4F6EF7]/60 hover:bg-[#15121F] transition-all flex items-center justify-between group"
                  >
                    <div className="flex items-center space-x-2.5 overflow-hidden">
                      <div className="p-2 rounded-lg bg-[#15121F] text-[#4F6EF7] group-hover:scale-110 transition-transform">
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                        </svg>
                      </div>
                      <div className="truncate">
                        <span className="text-[9px] font-mono text-[#8A84A3] block">LINKEDIN</span>
                        <span className="text-xs font-mono text-[#ECEAF5] group-hover:text-[#4F6EF7] transition-colors truncate block">
                          Sai Manikanta
                        </span>
                      </div>
                    </div>
                    <ArrowUpRight size={13} className="text-[#8A84A3] group-hover:text-[#4F6EF7] transition-colors shrink-0" />
                  </a>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>

      {/* Footer Featuring Actual Logo File (Mandated by Brand Guidelines) */}
      <footer className="mt-20 pt-8 border-t border-[#29233B] flex flex-col md:flex-row items-center justify-between gap-6 font-mono text-xs text-[#8A84A3]">
        <div className="flex items-center space-x-3">
          {/* Actual Logo in Footer */}
          <div className="w-8 h-8 rounded-full overflow-hidden shrink-0">
            <img 
              src={logoImg} 
              alt="BuildBytes B3 Logo Badge" 
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <span className="text-[#ECEAF5] font-semibold">BUILDBYTES</span>
            <span className="text-[#8A84A3]"> • SOFTWARE & BUSINESS AUTOMATION STUDIO</span>
          </div>
        </div>

        {/* Quick Social Anchors */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-[11px]">
          <a
            href={contact.instagramBuildbytes}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#8A84A3] hover:text-[#E53E9C] transition-colors"
          >
            Instagram: @buildbytes.tech
          </a>
          <span className="text-[#29233B]">•</span>
          <a
            href={contact.instagramTinyTale}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#8A84A3] hover:text-[#E53E9C] transition-colors"
          >
            @tiny_talekids
          </a>
          <span className="text-[#29233B]">•</span>
          <a
            href={contact.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#8A84A3] hover:text-[#4F6EF7] transition-colors"
          >
            Facebook
          </a>
          <span className="text-[#29233B]">•</span>
          <a
            href={contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#8A84A3] hover:text-[#4F6EF7] transition-colors"
          >
            LinkedIn
          </a>
        </div>

        <div className="flex items-center space-x-4">
          <span className="text-[#4F6EF7] hidden lg:inline">END OF TITLE SEQUENCE</span>
          <button
            onClick={handleScrollTop}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-[#15121F] hover:bg-[#1D192B] border border-[#29233B] hover:border-[#E53E9C] text-[#ECEAF5] hover:text-[#E53E9C] transition-colors cursor-pointer"
            title="Roll back to Scene 01"
          >
            <span>REPLAY SEQUENCE</span>
            <ArrowUp size={13} />
          </button>
        </div>
      </footer>
    </section>
  );
}
