import React from 'react';
import { Building2, Stethoscope, Hotel, Coffee, Check, ShieldCheck } from 'lucide-react';
import { buildbytesData } from '../data/buildbytesData';

export default function IndustriesScene() {
  const { industries } = buildbytesData;

  const icons = [
    <Building2 key="re" className="text-[#7B2FF7]" size={22} />,
    <Stethoscope key="hc" className="text-[#4F6EF7]" size={22} />,
    <Hotel key="hotel" className="text-[#E53E9C]" size={22} />,
    <Coffee key="cafe" className="text-[#7B2FF7]" size={22} />,
  ];

  return (
    <section 
      id="industries" 
      className="relative min-h-screen py-24 sm:py-32 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto flex flex-col justify-center"
      aria-label="Scene 04 — Who we build for"
    >
      {/* Scene Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#29233B] pb-6 mb-12 sm:mb-16">
        <div>
          <div className="flex items-center space-x-2 font-mono text-xs text-[#4F6EF7] mb-2 tracking-cinema-wide uppercase">
            <span className="w-2 h-2 bg-[#7B2FF7] rounded-sm" />
            <span>{industries.label}</span>
          </div>
          <h2 className="font-display font-condensed text-4xl sm:text-5xl md:text-6xl uppercase tracking-tight text-[#ECEAF5] font-bold">
            INDUSTRIES WE SERVE
          </h2>
        </div>

        <div className="mt-4 md:mt-0 font-mono text-xs text-[#8A84A3]">
          <span>4 PRODUCTION PLAYBOOKS</span>
        </div>
      </div>

      {/* Subline */}
      <div className="max-w-3xl mb-12">
        <h3 className="text-2xl sm:text-3xl font-bold text-[#ECEAF5] leading-snug">
          {industries.headline}
        </h3>
        <p className="mt-2 text-sm text-[#8A84A3] font-sans">
          Purpose-built workflow architectures engineered for your industry's exact operational rhythms.
        </p>
      </div>

      {/* 4 Industry Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        {industries.cards.map((card, idx) => (
          <div 
            key={card.id}
            className="gradient-border-card p-6 sm:p-8 flex flex-col justify-between"
          >
            <div>
              {/* Card Top Indicator */}
              <div className="flex items-center justify-between pb-4 border-b border-[#29233B] mb-5">
                <div className="flex items-center space-x-3">
                  <div className="p-3 rounded-xl bg-[#0B0A14] border border-[#29233B]">
                    {icons[idx]}
                  </div>
                  <div>
                    <span className="font-mono text-[10px] text-[#4F6EF7] font-bold uppercase tracking-wider block">
                      {card.code}
                    </span>
                    <h4 className="font-display font-condensed text-3xl uppercase tracking-tight text-[#ECEAF5] font-bold">
                      {card.title}
                    </h4>
                  </div>
                </div>

                <span className="font-mono text-[10px] text-[#8A84A3] px-2.5 py-1 rounded bg-[#0B0A14] border border-[#29233B]">
                  LIVE READY
                </span>
              </div>

              {/* Tagline */}
              <p className="text-xs font-mono text-[#E53E9C] font-semibold mb-4">
                {card.tagline}
              </p>

              {/* Specific Automation Features */}
              <div className="space-y-3 mt-4">
                <span className="font-mono text-[10px] text-[#8A84A3] uppercase tracking-wider block">
                  DELIVERED AUTOMATIONS:
                </span>
                {card.features.map((feat, fIdx) => (
                  <div key={fIdx} className="flex items-start space-x-2.5 text-xs sm:text-sm font-sans text-[#ECEAF5]">
                    <div className="p-0.5 rounded-full bg-[#7B2FF7]/20 border border-[#7B2FF7]/50 text-[#7B2FF7] mt-0.5 shrink-0">
                      <Check size={12} />
                    </div>
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              {/* Healthcare disclaimer if applicable */}
              {card.disclaimer && (
                <div className="mt-4 p-2.5 rounded-lg bg-[#0B0A14] border border-[#4F6EF7]/30 flex items-center space-x-2 text-[11px] font-mono text-[#4F6EF7]">
                  <ShieldCheck size={14} className="shrink-0" />
                  <span>{card.disclaimer}</span>
                </div>
              )}
            </div>

            {/* Bottom Highlight Pill */}
            <div className="mt-6 pt-4 border-t border-[#29233B] flex items-center justify-between text-xs font-mono text-[#8A84A3]">
              <span>OUTCOME:</span>
              <span className="text-[#ECEAF5] font-semibold bg-[#0B0A14] px-2.5 py-1 rounded border border-[#29233B]">
                {card.highlight}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
