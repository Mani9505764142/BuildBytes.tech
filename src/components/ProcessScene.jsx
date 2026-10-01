import React from 'react';
import { PhoneCall, Code, Rocket, LifeBuoy, ArrowRight } from 'lucide-react';
import { buildbytesData } from '../data/buildbytesData';

export default function ProcessScene() {
  const { process } = buildbytesData;

  const stepIcons = [
    <PhoneCall key="call" className="text-[#7B2FF7]" size={20} />,
    <Code key="code" className="text-[#4F6EF7]" size={20} />,
    <Rocket key="launch" className="text-[#E53E9C]" size={20} />,
    <LifeBuoy key="support" className="text-[#7B2FF7]" size={20} />,
  ];

  return (
    <section 
      id="process" 
      className="relative min-h-screen py-24 sm:py-32 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto flex flex-col justify-center"
      aria-label="Scene 06 — How we work"
    >
      {/* Scene Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#29233B] pb-6 mb-12 sm:mb-16">
        <div>
          <div className="flex items-center space-x-2 font-mono text-xs text-[#4F6EF7] mb-2 tracking-cinema-wide uppercase">
            <span className="w-2 h-2 bg-[#7B2FF7] rounded-sm" />
            <span>{process.label}</span>
          </div>
          <h2 className="font-display font-condensed text-4xl sm:text-5xl md:text-6xl uppercase tracking-tight text-[#ECEAF5] font-bold">
            HOW WE WORK
          </h2>
        </div>

        <div className="mt-4 md:mt-0 font-mono text-xs text-[#8A84A3]">
          <span>4-STEP PRODUCTION PIPELINE</span>
        </div>
      </div>

      {/* Subline */}
      <div className="max-w-3xl mb-12">
        <h3 className="text-2xl sm:text-3xl font-bold text-[#ECEAF5] leading-snug">
          {process.headline}
        </h3>
      </div>

      {/* 4 Process Steps */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {process.steps.map((step, idx) => (
          <div
            key={step.number}
            className="gradient-border-card p-6 sm:p-7 flex flex-col justify-between relative group"
          >
            <div>
              {/* Step Number & Icon */}
              <div className="flex items-center justify-between pb-4 border-b border-[#29233B] mb-5">
                <span className="font-mono text-xs font-bold text-[#4F6EF7] px-2 py-0.5 rounded bg-[#0B0A14] border border-[#29233B]">
                  PHASE // {step.number}
                </span>
                <div className="p-2.5 rounded-xl bg-[#0B0A14] border border-[#29233B]">
                  {stepIcons[idx]}
                </div>
              </div>

              {/* Title */}
              <h4 className="font-display font-condensed text-3xl uppercase tracking-tight text-[#ECEAF5] font-bold mb-3 group-hover:text-[#E53E9C] transition-colors">
                {step.name}
              </h4>

              {/* Single Sentence Requirement */}
              <p className="text-xs sm:text-sm text-[#8A84A3] font-sans leading-relaxed">
                {step.sentence}
              </p>
            </div>

            {/* Step Connection Telemetry */}
            <div className="mt-8 pt-4 border-t border-[#29233B] flex items-center justify-between text-[11px] font-mono text-[#8A84A3]">
              <span>PHASE {step.number}</span>
              {idx < process.steps.length - 1 ? (
                <span className="text-[#4F6EF7] flex items-center space-x-1">
                  <span>NEXT</span>
                  <ArrowRight size={12} />
                </span>
              ) : (
                <span className="text-[#E53E9C]">AUTONOMOUS</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
