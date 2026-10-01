import React from 'react';
import { Clock, CalendarX, TrendingDown } from 'lucide-react';
import { buildbytesData } from '../data/buildbytesData';

export default function ProblemScene() {
  const { problem } = buildbytesData;

  const icons = [
    <Clock key="clock" className="text-[#E53E9C]" size={22} />,
    <CalendarX key="calendar" className="text-[#7B2FF7]" size={22} />,
    <TrendingDown key="chart" className="text-[#4F6EF7]" size={22} />,
  ];

  return (
    <section 
      id="problem" 
      className="relative min-h-screen py-24 sm:py-32 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto flex flex-col justify-center"
      aria-label="Scene 02 — What's costing you time"
    >
      {/* Scene Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#29233B] pb-6 mb-12 sm:mb-16">
        <div>
          <div className="flex items-center space-x-2 font-mono text-xs text-[#4F6EF7] mb-2 tracking-cinema-wide uppercase">
            <span className="w-2 h-2 bg-[#E53E9C] rounded-sm" />
            <span>{problem.label}</span>
          </div>
          <h2 className="font-display font-condensed text-4xl sm:text-5xl md:text-6xl uppercase tracking-tight text-[#ECEAF5] font-bold">
            THE BOTTLENECKS
          </h2>
        </div>

        <div className="mt-4 md:mt-0 font-mono text-xs text-[#8A84A3]">
          <span>DIAGNOSIS: THREE RECURRING FRICTIONS</span>
        </div>
      </div>

      {/* Narrative Lead */}
      <div className="max-w-3xl mb-12">
        <h3 className="text-2xl sm:text-3xl font-bold text-[#ECEAF5] leading-snug">
          {problem.headline}
        </h3>
        <p className="mt-3 text-sm sm:text-base text-[#8A84A3] font-sans leading-relaxed">
          {problem.subline}
        </p>
      </div>

      {/* Three Pain Point Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
        {problem.points.map((pt, idx) => (
          <div 
            key={pt.code}
            className="gradient-border-card p-6 sm:p-7 flex flex-col justify-between"
          >
            <div>
              {/* Card Header */}
              <div className="flex items-center justify-between pb-4 border-b border-[#29233B] mb-5">
                <div className="p-3 rounded-xl bg-[#0B0A14] border border-[#29233B]">
                  {icons[idx]}
                </div>
                <span className="font-mono text-xs text-[#4F6EF7] font-bold px-2 py-0.5 rounded bg-[#0B0A14] border border-[#29233B]">
                  PAIN // {pt.code}
                </span>
              </div>

              {/* Title & Description */}
              <h4 className="font-display font-condensed text-2xl sm:text-3xl uppercase tracking-tight text-[#ECEAF5] font-bold mb-3">
                {pt.title}
              </h4>

              <p className="text-xs sm:text-sm text-[#8A84A3] font-sans leading-relaxed">
                {pt.description}
              </p>
            </div>

            {/* Impact Metric Callout */}
            <div className="mt-6 pt-4 border-t border-[#29233B] bg-[#0B0A14]/60 -mx-6 -mb-6 p-4 rounded-b-2xl">
              <span className="font-mono text-[10px] text-[#E53E9C] uppercase tracking-wider block mb-1">
                BUSINESS IMPACT
              </span>
              <p className="text-xs font-mono text-[#ECEAF5] font-medium">
                {pt.impact}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Transitional Lead into Scene 03 (Services) */}
      <div className="mt-12 p-6 rounded-2xl bg-[#15121F] border border-[#29233B] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div>
          <span className="font-mono text-xs text-[#E53E9C] uppercase tracking-wider block">THE REMEDY</span>
          <p className="text-sm font-sans text-[#ECEAF5] font-semibold mt-0.5">
            Every one of these friction points can be solved with modern software solutions & autonomous pipelines.
          </p>
        </div>
        <a 
          href="#services"
          className="font-mono text-xs text-[#4F6EF7] hover:text-[#ECEAF5] underline underline-offset-4 tracking-wider uppercase whitespace-nowrap"
        >
          SEE SOFTWARE SOLUTIONS (SCENE 03) →
        </a>
      </div>
    </section>
  );
}
