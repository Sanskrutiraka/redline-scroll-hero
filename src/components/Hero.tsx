'use client';

import React, { useRef, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from '@/lib/gsap';
import { useLenis } from '@/hooks/useLenis';
import { useHeroIntro } from '@/hooks/useHeroIntro';
import { useHeroScroll } from '@/hooks/useHeroScroll';
import Headline from './Headline';
import Road from './Road';
import Car from './Car';
import Stats from './Stats';
import ProgressBar from './ProgressBar';

export const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { stop: stopScroll, start: startScroll } = useLenis(true);

  const { playIntro } = useHeroIntro({
    scopeRef: containerRef,
    stopScroll,
    startScroll,
  });

  const { initScrollAnimation } = useHeroScroll({
    scopeRef: containerRef,
  });

  useGSAP(
    () => {
      if (typeof window === 'undefined' || !containerRef.current) return;

      const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches;

      // 1. Play intro timeline
      playIntro(prefersReducedMotion);

      // 2. Initialize scroll triggers & choreography
      const cleanupScroll = initScrollAnimation();

      // 3. Refresh ScrollTrigger after assets & fonts have rendered
      const handleAssetLoad = () => {
        ScrollTrigger.refresh();
      };

      if (document.readyState === 'complete') {
        ScrollTrigger.refresh();
      } else {
        window.addEventListener('load', handleAssetLoad);
      }

      // Check font loading readiness
      if ('fonts' in document) {
        document.fonts.ready.then(() => {
          ScrollTrigger.refresh();
        });
      }

      return () => {
        window.removeEventListener('load', handleAssetLoad);
        cleanupScroll?.();
      };
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      id="hero"
      className="relative w-full h-[100svh] min-h-[100svh] bg-bg overflow-hidden flex flex-col justify-between items-center select-none"
    >
      {/* 0. Black Intro Flash Overlay (fades out at t=0.0) */}
      <div
        data-intro-overlay
        aria-hidden="true"
        className="fixed inset-0 bg-[#0F0E0D] z-[100] pointer-events-none"
      />

      {/* 1. Header / Headline Section (~18% from top) */}
      <header className="relative z-10 w-full pt-[6svh] sm:pt-[7svh] lg:pt-[8svh] px-4">
        <Headline />
      </header>

      {/* 2. Middle Section: Road Track & Animated Car (~50% vertically centered) */}
      <div className="relative w-full my-auto flex items-center justify-center">
        <Road />
        <Car />
      </div>

      {/* 3. Bottom Section: Stats Metrics Row (~80% from top) */}
      <section
        aria-label="Key Performance Metrics"
        className="relative z-10 w-full pb-[6svh] sm:pb-[7svh] lg:pb-[8svh] px-4"
      >
        <Stats />
      </section>

      {/* 4. Bottom-Left Scroll Indicator */}
      <div
        data-scroll-hint
        aria-hidden="true"
        className="absolute bottom-4 left-6 sm:bottom-6 sm:left-8 z-30 flex items-center gap-3 opacity-0 pointer-events-none select-none text-muted"
      >
        <span className="label-micro text-[10px] tracking-[0.25em] font-medium text-muted">
          SCROLL
        </span>
        <div className="w-8 sm:w-12 h-[1px] bg-muted/40 relative overflow-hidden">
          <div className="absolute inset-0 bg-accent w-1/2 animate-[pulse_1.8s_ease-in-out_infinite]" />
        </div>
      </div>

      {/* 5. Scroll Progress Bar along right edge */}
      <ProgressBar />
    </div>
  );
};

export default Hero;
