import React from 'react';

export default function CinematicOverlay({ activeScene, totalScenes = 7 }) {
  return (
    <>
      {/* Film grain layer */}
      <div className="film-grain" aria-hidden="true" />

      {/* Cinematic vignette */}
      <div className="cinema-vignette" aria-hidden="true" />

      {/* Viewfinder crosshairs and HUD framing */}
      <div className="fixed inset-0 pointer-events-none z-30 flex flex-col justify-between p-4 sm:p-6 md:p-8" aria-hidden="true">
        {/* Top framing telemetry */}
        <div className="flex justify-between items-center text-[10px] md:text-xs font-mono text-[#8A84A3]/50 select-none">
          <div className="flex items-center space-x-2">
            <span className="inline-block w-2 h-2 rounded-full bg-[#E53E9C] animate-pulse" />
            <span className="tracking-widest text-[#E53E9C] font-semibold">STUDIO [ACTIVE]</span>
            <span className="hidden sm:inline text-[#8A84A3]/30">|</span>
            <span className="hidden sm:inline text-[#4F6EF7]">BUILDBYTES AUTOMATION ENGINE</span>
          </div>

          <div className="flex items-center space-x-3">
            <span className="hidden md:inline tracking-wider text-[#8A84A3]/60">COLOR: INDIGO-PURPLE GRADE</span>
            <div className="flex items-center space-x-1.5 border border-[#4F6EF7]/20 px-2 py-0.5 rounded bg-[#0B0A14]/70 backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4F6EF7]"></span>
              <span className="text-[#4F6EF7] font-medium tracking-wider">24.00 FPS</span>
            </div>
          </div>
        </div>

        {/* Framing corner reticles */}
        <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-[#4F6EF7]/40" />
        <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-[#4F6EF7]/40" />
        <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-[#4F6EF7]/40" />
        <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-[#4F6EF7]/40" />

        {/* Bottom framing bar */}
        <div className="flex justify-between items-center text-[10px] md:text-xs font-mono text-[#8A84A3]/60 select-none pt-4">
          <div className="flex items-center space-x-2">
            <span className="text-[#8A84A3]">SCENE:</span>
            <span className="text-[#ECEAF5] font-semibold tracking-wider">
              {String(activeScene).padStart(2, '0')} / {String(totalScenes).padStart(2, '0')}
            </span>
          </div>

          <div className="flex items-center space-x-3 text-[10px]">
            <span className="hidden sm:inline text-[#8A84A3]/40">ZERO DROP WORKFLOWS</span>
            <div className="w-14 h-1.5 bg-[#15121F] rounded-sm overflow-hidden border border-[#29233B] hidden xs:block">
              <div 
                className="h-full bg-gradient-to-r from-[#7B2FF7] to-[#E53E9C] transition-all duration-300"
                style={{ width: `${(activeScene / totalScenes) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
