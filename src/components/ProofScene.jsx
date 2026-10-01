import React, { useState } from 'react';
import { Eye } from 'lucide-react';
import { buildbytesData } from '../data/buildbytesData';

export default function ProofScene() {
  const { proofOfWork } = buildbytesData;
  const [modalImage, setModalImage] = useState(null);

  return (
    <section 
      id="proof" 
      className="relative min-h-screen py-24 sm:py-32 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto flex flex-col justify-center"
      aria-label="Scene 05 — What we've actually built"
    >
      {/* Scene Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#29233B] pb-6 mb-12 sm:mb-16">
        <div>
          <div className="flex items-center space-x-2 font-mono text-xs text-[#4F6EF7] mb-2 tracking-cinema-wide uppercase">
            <span className="w-2 h-2 bg-[#E53E9C] rounded-sm" />
            <span>{proofOfWork.label}</span>
          </div>
          <h2 className="font-display font-condensed text-4xl sm:text-5xl md:text-6xl uppercase tracking-tight text-[#ECEAF5] font-bold">
            PROOF OF WORK & CAPABILITIES
          </h2>
        </div>

        <div className="mt-4 md:mt-0 font-mono text-xs text-[#8A84A3]">
          <span>VERIFIED PRODUCTION WORKFLOWS</span>
        </div>
      </div>

      {/* Subline */}
      <div className="max-w-3xl mb-12">
        <h3 className="text-2xl sm:text-3xl font-bold text-[#ECEAF5] leading-snug">
          {proofOfWork.headline}
        </h3>
        <p className="mt-2 text-sm text-[#8A84A3] font-sans leading-relaxed">
          {proofOfWork.subline}
        </p>
      </div>

      {/* 3 Proof of Work Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {proofOfWork.cards.map((work) => (
          <article 
            key={work.id}
            className="gradient-border-card overflow-hidden flex flex-col justify-between group shadow-xl"
          >
            <div>
              {/* Architecture Schematic Image Preview */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#0B0A14] border-b border-[#29233B]">
                <img
                  src={work.image}
                  alt={`${work.title} architecture`}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 opacity-85 group-hover:opacity-100"
                  loading="lazy"
                />

                {/* Badge Overlay */}
                <div className="absolute top-3 left-3 font-mono text-[9px] font-bold bg-[#0B0A14]/90 backdrop-blur-sm border border-[#4F6EF7]/40 text-[#4F6EF7] px-2 py-0.5 rounded">
                  {work.category}
                </div>

                {/* Inspect Button */}
                <button
                  onClick={() => setModalImage(work)}
                  className="absolute inset-0 bg-[#0B0A14]/60 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-1.5 text-xs font-mono text-[#ECEAF5]"
                  aria-label={`Inspect ${work.title} diagram`}
                >
                  <span className="bg-[#15121F] border border-[#7B2FF7] px-3 py-1.5 rounded-lg flex items-center space-x-1.5 text-[#E53E9C] hover:text-[#ECEAF5]">
                    <Eye size={13} />
                    <span>INSPECT SCHEMATIC</span>
                  </span>
                </button>
              </div>

              {/* Card Body */}
              <div className="p-6">
                <span className="text-[10px] font-mono text-[#E53E9C] uppercase tracking-wider block mb-1">
                  REFERENCE: {work.projectRef}
                </span>

                <h4 className="font-display font-condensed text-2xl sm:text-3xl text-[#ECEAF5] uppercase font-bold tracking-tight mb-2 group-hover:text-[#4F6EF7] transition-colors">
                  {work.title}
                </h4>

                <p className="text-xs sm:text-sm text-[#8A84A3] font-sans leading-relaxed">
                  {work.description}
                </p>

                {/* Demonstrates Highlight Box */}
                <div className="mt-4 p-3 rounded-xl bg-[#0B0A14] border border-[#29233B]">
                  <span className="text-[10px] font-mono text-[#4F6EF7] uppercase tracking-wider block mb-1">
                    WHAT THIS DEMONSTRATES:
                  </span>
                  <p className="text-xs font-sans text-[#ECEAF5] font-medium leading-normal">
                    {work.demonstrates}
                  </p>
                </div>
              </div>
            </div>

            {/* Monospace Stack Tags Footer */}
            <div className="p-6 pt-0 border-t border-[#29233B]/50 mt-4">
              <div className="pt-4 flex flex-wrap gap-1.5">
                {work.stack.map((tech) => (
                  <span
                    key={tech}
                    className="bg-[#0B0A14] border border-[#7B2FF7]/30 text-[#ECEAF5] font-mono text-[10px] px-2 py-0.5 rounded tracking-wide"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Mandatory Required Sentence Callout */}
      <div className="mt-14 p-6 sm:p-7 rounded-2xl bg-[#15121F] border border-[#29233B] text-center max-w-4xl mx-auto shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-32 h-32 bg-[#E53E9C]/10 blur-3xl pointer-events-none" />
        
        <p className="font-sans text-base sm:text-lg text-[#ECEAF5] font-semibold leading-relaxed">
          "{proofOfWork.clientNote}"
        </p>

        <div className="mt-4">
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="inline-flex items-center space-x-2 font-mono text-xs text-[#E53E9C] hover:text-[#ECEAF5] underline underline-offset-4 tracking-wider uppercase cursor-pointer"
          >
            <span>SCHEDULE A BOTTLENECK DISCOVERY CALL →</span>
          </a>
        </div>
      </div>

      {/* Schematic Modal */}
      {modalImage && (
        <div 
          className="fixed inset-0 z-50 bg-[#07060D]/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          onClick={() => setModalImage(null)}
          role="dialog"
          aria-modal="true"
        >
          <div 
            className="bg-[#15121F] border border-[#29233B] rounded-2xl max-w-4xl w-full overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 bg-[#0B0A14] border-b border-[#29233B] flex items-center justify-between">
              <span className="font-mono text-xs text-[#E53E9C] font-bold">
                DIAGRAM // {modalImage.title}
              </span>
              <button
                onClick={() => setModalImage(null)}
                className="font-mono text-xs text-[#8A84A3] hover:text-[#ECEAF5] px-2 py-1 rounded bg-[#15121F] border border-[#29233B]"
              >
                CLOSE [ESC]
              </button>
            </div>

            <div className="relative bg-black flex items-center justify-center max-h-[70vh] overflow-hidden">
              <img
                src={modalImage.image}
                alt={modalImage.title}
                className="w-full h-auto object-contain"
              />
            </div>

            <div className="p-4 sm:p-6 bg-[#15121F]">
              <p className="text-xs text-[#8A84A3] font-sans">
                {modalImage.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
