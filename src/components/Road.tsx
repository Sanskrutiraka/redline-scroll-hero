'use client';

import React from 'react';

interface RoadProps {
  className?: string;
}

export const Road: React.FC<RoadProps> = ({ className = '' }) => {
  return (
    <div
      data-road-wrapper
      className={`relative w-full h-[18vh] sm:h-[20vh] lg:h-[22vh] overflow-hidden flex items-center justify-center select-none ${className}`}
    >
      {/* 1. Far Layer: Faint horizon light streaks / perspective grid lines */}
      <div
        data-far-layer
        aria-hidden="true"
        className="absolute inset-0 w-[140vw] -left-[20vw] h-full pointer-events-none opacity-20 will-change-transform"
        style={{
          backgroundImage: `
            linear-gradient(90deg, rgba(236,230,218,0.03) 1px, transparent 1px),
            linear-gradient(0deg, rgba(236,230,218,0.02) 1px, transparent 1px)
          `,
          backgroundSize: '80px 40px',
        }}
      />

      {/* Main Road Tarmac Surface */}
      <div
        data-road-band
        className="relative w-full h-full bg-[#1D1B19] flex items-center origin-left will-change-transform"
        style={{
          boxShadow: 'inset 0 10px 30px rgba(0,0,0,0.6), inset 0 -10px 30px rgba(0,0,0,0.6)',
        }}
      >
        {/* Top Boundary Edge Line */}
        <div
          aria-hidden="true"
          className="absolute top-0 left-0 right-0 h-[1px] bg-[#ECE6DA]/[0.08]"
        />

        {/* Bottom Boundary Edge Line */}
        <div
          aria-hidden="true"
          className="absolute bottom-0 left-0 right-0 h-[1px] bg-[#ECE6DA]/[0.08]"
        />

        {/* 2. Mid Layer: Seamless Repeating Lane-Dash Strip (~200vw wide for parallax) */}
        <div
          data-mid-dash-layer
          aria-hidden="true"
          className="absolute top-1/2 -translate-y-1/2 left-[-50vw] w-[250vw] h-[4px] pointer-events-none will-change-transform"
          style={{
            backgroundImage: `repeating-linear-gradient(
              to right,
              rgba(217, 180, 74, 0.72) 0px,
              rgba(217, 180, 74, 0.72) 60px,
              transparent 60px,
              transparent 120px
            )`,
            backgroundSize: '120px 4px',
            filter: 'drop-shadow(0 0 6px rgba(217, 180, 74, 0.35))',
          }}
        />

        {/* Subtle road shoulder markers (faint edge dashes) */}
        <div
          aria-hidden="true"
          className="absolute top-2 left-0 right-0 h-[1px] opacity-15"
          style={{
            backgroundImage: 'repeating-linear-gradient(to right, #ECE6DA 0px, #ECE6DA 20px, transparent 20px, transparent 40px)',
          }}
        />
        <div
          aria-hidden="true"
          className="absolute bottom-2 left-0 right-0 h-[1px] opacity-15"
          style={{
            backgroundImage: 'repeating-linear-gradient(to right, #ECE6DA 0px, #ECE6DA 20px, transparent 20px, transparent 40px)',
          }}
        />
      </div>
    </div>
  );
};

export default Road;
