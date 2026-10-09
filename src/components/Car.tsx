'use client';

import React from 'react';
import Image from 'next/image';

interface CarProps {
  className?: string;
}

export const Car: React.FC<CarProps> = ({ className = '' }) => {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  const carImageUrl = `${basePath}/car.png`;

  return (
    <div
      data-car-group
      className={`absolute left-0 top-1/2 -translate-y-1/2 pointer-events-none select-none will-change-transform z-20 ${className}`}
      style={{
        width: 'clamp(280px, 38vw, 640px)',
      }}
    >
      <div className="relative w-full aspect-[2/1] flex items-center justify-center">
        {/* Soft Radial Underglow Behind the Car */}
        <div
          data-car-underglow
          aria-hidden="true"
          className="absolute inset-0 -inset-x-12 -inset-y-6 rounded-full opacity-60 pointer-events-none will-change-transform"
          style={{
            background: 'radial-gradient(ellipse at 50% 50%, rgba(229, 50, 45, 0.48) 0%, rgba(229, 50, 45, 0.15) 50%, transparent 75%)',
            filter: 'blur(20px)',
          }}
        />

        {/* Realistic Elliptical Contact & Ground Ambient Shadow */}
        <div
          aria-hidden="true"
          className="absolute inset-x-4 top-1/2 -translate-y-1/2 h-[75%] rounded-[50%] pointer-events-none opacity-80"
          style={{
            background: 'radial-gradient(ellipse at 50% 50%, rgba(0, 0, 0, 0.95) 0%, rgba(0, 0, 0, 0.6) 60%, transparent 80%)',
            filter: 'blur(10px)',
          }}
        />

        {/* Speed Lines (6 thin streaks extending backward from rear tail) */}
        <div
          data-speed-lines-container
          aria-hidden="true"
          className="absolute -left-[45%] top-1/2 -translate-y-1/2 w-[50%] h-[70%] pointer-events-none flex flex-col justify-between py-1"
        >
          {/* Line 1 - Bone */}
          <div
            data-speed-line
            className="h-[1px] w-[80%] bg-[#ECE6DA]/30 self-end origin-right scale-x-[0.2] will-change-transform rounded-full"
          />
          {/* Line 2 - Accent Red */}
          <div
            data-speed-line
            className="h-[1.5px] w-[100%] bg-accent/80 self-end origin-right scale-x-[0.2] will-change-transform rounded-full shadow-[0_0_8px_rgba(229,50,45,0.6)]"
          />
          {/* Line 3 - Bone */}
          <div
            data-speed-line
            className="h-[1px] w-[65%] bg-[#ECE6DA]/25 self-end origin-right scale-x-[0.2] will-change-transform rounded-full"
          />
          {/* Line 4 - Accent Red */}
          <div
            data-speed-line
            className="h-[1.5px] w-[90%] bg-accent/70 self-end origin-right scale-x-[0.2] will-change-transform rounded-full shadow-[0_0_8px_rgba(229,50,45,0.5)]"
          />
          {/* Line 5 - Bone */}
          <div
            data-speed-line
            className="h-[1px] w-[75%] bg-[#ECE6DA]/25 self-end origin-right scale-x-[0.2] will-change-transform rounded-full"
          />
          {/* Line 6 - Bone */}
          <div
            data-speed-line
            className="h-[1px] w-[50%] bg-[#ECE6DA]/20 self-end origin-right scale-x-[0.2] will-change-transform rounded-full"
          />
        </div>

        {/* Inner Car Wrapper: Flipped horizontally with scaleX(-1) so nose points RIGHT */}
        <div
          data-car-inner
          className="relative w-full h-full flex items-center justify-center transform -scale-x-100"
        >
          <Image
            src={carImageUrl}
            alt="Red sports car top view driving along asphalt track"
            fill
            priority
            sizes="(max-width: 768px) 70vw, (max-width: 1200px) 45vw, 640px"
            className="object-contain drop-shadow-[0_15px_15px_rgba(0,0,0,0.8)]"
            draggable={false}
          />
        </div>
      </div>
    </div>
  );
};

export default Car;
