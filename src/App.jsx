import React, { useState, useEffect } from 'react';
import CinematicOverlay from './components/CinematicOverlay';
import BuildBytesNavbar from './components/BuildBytesNavbar';
import OpeningSequence from './components/OpeningSequence';
import HeroScene from './components/HeroScene';
import ProblemScene from './components/ProblemScene';
import ServicesScene from './components/ServicesScene';
import IndustriesScene from './components/IndustriesScene';
import ProofScene from './components/ProofScene';
import ProcessScene from './components/ProcessScene';
import ContactScene from './components/ContactScene';

export default function App() {
  const [openingFinished, setOpeningFinished] = useState(false);
  const [activeScene, setActiveScene] = useState(1);

  // Dynamic intersection observer tracking the 7 scenes
  useEffect(() => {
    const sceneIds = ['hero', 'problem', 'services', 'industries', 'proof', 'process', 'contact'];
    const observers = [];

    sceneIds.forEach((id, index) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveScene(index + 1);
            }
          });
        },
        {
          rootMargin: '-30% 0px -30% 0px',
          threshold: 0.1,
        }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => {
      observers.forEach((obs) => obs.disconnect());
    };
  }, [openingFinished]);

  return (
    <div className="relative min-h-screen bg-[#0B0A14] text-[#ECEAF5] overflow-x-hidden">
      
      {/* 1. Orchestrated One-Time Opening Cinematic Title Sequence */}
      {!openingFinished && (
        <OpeningSequence onComplete={() => setOpeningFinished(true)} />
      )}

      {/* 2. Global Cinematic Overlay (Framing reticles, grain, vignette, dynamic scene tracker) */}
      <CinematicOverlay activeScene={activeScene} totalScenes={7} />

      {/* 3. Global Navbar Featuring Actual Logo Badge */}
      <BuildBytesNavbar activeScene={activeScene} />

      {/* 4. The 7 Numbered Scenes */}
      <main className="relative z-10" id="main-content">
        {/* Scene 01: Opening Title Card (Hero) */}
        <HeroScene />

        {/* Scene 02: What's Costing You Time (The Problem) */}
        <ProblemScene />

        {/* Scene 03: Software Solutions & Services */}
        <ServicesScene />

        {/* Scene 04: Who We Build For (Industries We Serve) */}
        <IndustriesScene />

        {/* Scene 05: What We've Actually Built (Proof of Work) */}
        <ProofScene />

        {/* Scene 06: How We Work (4-Step Process) */}
        <ProcessScene />

        {/* Scene 07: Contact & Closing Credits */}
        <ContactScene />
      </main>

    </div>
  );
}
