'use client';

import { useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { HERO_CONFIG } from '@/config/heroConfig';

export function useLenis(enabled = true) {
  const lenisRef = useRef<Lenis | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!enabled || typeof window === 'undefined') return;

    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Initialize Lenis with configured parameters
    const lenis = new Lenis({
      lerp: HERO_CONFIG.lenis.lerp,
      duration: HERO_CONFIG.lenis.duration,
      smoothWheel: HERO_CONFIG.lenis.smoothWheel,
      wheelMultiplier: HERO_CONFIG.lenis.wheelMultiplier,
      touchMultiplier: HERO_CONFIG.lenis.touchMultiplier,
      autoRaf: false, // We sync manually to GSAP ticker
    });

    lenisRef.current = lenis;
    setIsReady(true);

    // Sync Lenis scroll events to ScrollTrigger
    const handleScroll = () => {
      ScrollTrigger.update();
    };
    lenis.on('scroll', handleScroll);

    // Sync Lenis RAF to GSAP ticker for frame-perfect lockstep
    const updateTicker = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateTicker);
      lenis.off('scroll', handleScroll);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [enabled]);

  return {
    lenis: lenisRef.current,
    isReady,
    stop: () => lenisRef.current?.stop(),
    start: () => lenisRef.current?.start(),
  };
}
