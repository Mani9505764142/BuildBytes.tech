import React, { useState } from 'react';
import { 
  Globe, 
  ShoppingBag, 
  Search, 
  Cpu, 
  Bot, 
  Layers, 
  CheckCircle2, 
  ArrowUpRight, 
  ArrowRight,
  Sparkles,
  Zap
} from 'lucide-react';
import { buildbytesData } from '../data/buildbytesData';

export default function ServicesScene() {
  const { services } = buildbytesData;
  const [activeCategory, setActiveCategory] = useState('ALL SOLUTIONS');

  const iconMap = {
    Globe: <Globe className="text-[#4F6EF7]" size={22} />,
    ShoppingBag: <ShoppingBag className="text-[#E53E9C]" size={22} />,
    Search: <Search className="text-[#7B2FF7]" size={22} />,
    Cpu: <Cpu className="text-[#4F6EF7]" size={22} />,
    Bot: <Bot className="text-[#E53E9C]" size={22} />,
    Layers: <Layers className="text-[#7B2FF7]" size={22} />,
  };

  const filteredItems = activeCategory === 'ALL SOLUTIONS'
    ? services.items
    : services.items.filter((item) => item.category === activeCategory);

  return (
    <section
      id="services"
      className="relative min-h-screen py-24 sm:py-32 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto flex flex-col justify-center"
      aria-label="Scene 03 — Software Solutions & Services"
    >
      {/* Background ambient gradient accents */}
      <div className="absolute inset-0 pointer-events-none -z-10 flex items-center justify-center">
        <div className="w-[500px] h-[400px] bg-gradient-to-tr from-[#4F6EF7]/10 via-[#7B2FF7]/10 to-transparent blur-[130px] rounded-full transform -translate-y-20" />
      </div>

      {/* Scene Header Telemetry */}
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#29233B] pb-6 mb-12 sm:mb-16">
        <div>
          <div className="flex items-center space-x-2 font-mono text-xs text-[#4F6EF7] mb-2 tracking-cinema-wide uppercase">
            <span className="w-2 h-2 bg-[#4F6EF7] rounded-sm animate-pulse" />
            <span>{services.label}</span>
          </div>
          <h2 className="font-display font-condensed text-4xl sm:text-5xl md:text-6xl uppercase tracking-tight text-[#ECEAF5] font-bold">
            SOFTWARE SOLUTIONS
          </h2>
        </div>

        <div className="mt-4 md:mt-0 font-mono text-xs text-[#8A84A3] flex items-center space-x-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#E53E9C]" />
          <span>6 CORE CAPABILITY MODULES</span>
        </div>
      </div>

      {/* Narrative Lead */}
      <div className="max-w-3xl mb-10">
        <h3 className="text-2xl sm:text-3xl font-bold text-[#ECEAF5] leading-snug">
          {services.headline}
        </h3>
        <p className="mt-3 text-sm sm:text-base text-[#8A84A3] font-sans leading-relaxed">
          {services.subline}
        </p>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap gap-2 mb-10">
        {services.categories.map((cat) => {
          const isActive = activeCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl font-mono text-xs transition-all flex items-center space-x-2 ${
                isActive
                  ? 'bg-[#1D192B] text-[#ECEAF5] border border-[#7B2FF7] shadow-[0_0_15px_rgba(123,47,247,0.3)] font-semibold'
                  : 'bg-[#15121F]/70 text-[#8A84A3] hover:text-[#ECEAF5] hover:bg-[#1D192B] border border-[#29233B]'
              }`}
            >
              {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#E53E9C] animate-pulse" />}
              <span>{cat}</span>
            </button>
          );
        })}
      </div>

      {/* Solutions Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="gradient-border-card p-6 sm:p-7 flex flex-col justify-between group hover:-translate-y-1 transition-transform duration-300"
          >
            <div>
              {/* Card Header */}
              <div className="flex items-center justify-between pb-4 border-b border-[#29233B] mb-5">
                <div className="p-3 rounded-xl bg-[#0B0A14] border border-[#29233B] group-hover:border-[#7B2FF7]/50 transition-colors">
                  {iconMap[item.icon] || <Zap className="text-[#4F6EF7]" size={22} />}
                </div>
                <div className="text-right">
                  <span className="font-mono text-[10px] text-[#8A84A3] uppercase tracking-wider block">
                    {item.type}
                  </span>
                  <span className="font-mono text-xs text-[#4F6EF7] font-bold">
                    {item.code}
                  </span>
                </div>
              </div>

              {/* Title & Tagline */}
              <h4 className="font-display font-condensed text-2xl sm:text-3xl uppercase tracking-tight text-[#ECEAF5] font-bold mb-1">
                {item.title}
              </h4>
              <p className="text-xs font-mono text-[#E53E9C] mb-3">
                {item.tagline}
              </p>

              {/* Description */}
              <p className="text-xs sm:text-sm text-[#8A84A3] font-sans leading-relaxed mb-5">
                {item.description}
              </p>

              {/* Core Capabilities */}
              <div className="space-y-2 mb-6">
                <span className="font-mono text-[10px] text-[#8A84A3] uppercase tracking-wider block">
                  CAPABILITIES & DELIVERABLES:
                </span>
                {item.capabilities.map((cap, cIdx) => (
                  <div key={cIdx} className="flex items-start space-x-2 text-xs text-[#ECEAF5]">
                    <CheckCircle2 size={13} className="text-[#4F6EF7] flex-shrink-0 mt-0.5" />
                    <span className="font-sans leading-relaxed">{cap}</span>
                  </div>
                ))}
              </div>

              {/* Stack Tags */}
              <div className="flex flex-wrap gap-1.5 mb-6">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 rounded bg-[#0B0A14] border border-[#29233B] text-[10px] font-mono text-[#8A84A3]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom Highlight Metric */}
            <div className="pt-4 border-t border-[#29233B] bg-[#0B0A14]/70 -mx-6 -mb-6 p-4 rounded-b-2xl flex items-center justify-between">
              <div>
                <span className="font-mono text-[9px] text-[#8A84A3] uppercase tracking-wider block">
                  PERFORMANCE PROMISE
                </span>
                <span className="text-xs font-mono text-[#ECEAF5] font-medium">
                  {item.highlight}
                </span>
              </div>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="p-1.5 rounded-lg bg-[#15121F] hover:bg-[#7B2FF7] text-[#8A84A3] hover:text-[#ECEAF5] border border-[#29233B] transition-colors"
                title={`Inquire about ${item.title}`}
              >
                <ArrowUpRight size={14} />
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Transition Banner to Scene 04 */}
      <div className="mt-12 sm:mt-16 p-6 sm:p-8 rounded-2xl bg-[#15121F] border border-[#29233B] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div className="flex items-center space-x-4">
          <div className="hidden sm:flex w-10 h-10 rounded-xl bg-[#0B0A14] border border-[#29233B] items-center justify-center text-[#7B2FF7]">
            <Sparkles size={18} />
          </div>
          <div>
            <span className="font-mono text-xs text-[#E53E9C] uppercase tracking-wider block">
              NEXT // SECTOR SPECIALIZATION
            </span>
            <p className="text-sm font-sans text-[#ECEAF5] font-semibold mt-0.5">
              Explore how these software solutions apply directly to Real Estate, Healthcare, Hospitality, and SMBs.
            </p>
          </div>
        </div>

        <a
          href="#industries"
          className="font-mono text-xs text-[#4F6EF7] hover:text-[#ECEAF5] underline underline-offset-4 tracking-wider uppercase whitespace-nowrap flex items-center space-x-1"
        >
          <span>SEE INDUSTRY PLAYBOOKS (SCENE 04)</span>
          <ArrowRight size={14} />
        </a>
      </div>
    </section>
  );
}
