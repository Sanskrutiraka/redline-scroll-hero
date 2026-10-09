'use client';

import { useRef } from 'react';
import { gsap } from '@/lib/gsap';
import { HERO_CONFIG } from '@/config/heroConfig';

interface UseHeroIntroOptions {
  scopeRef: React.RefObject<HTMLDivElement | null>;
  onComplete?: () => void;
  stopScroll?: () => void;
  startScroll?: () => void;
}

export function useHeroIntro({
  scopeRef,
  onComplete,
  stopScroll,
  startScroll,
}: UseHeroIntroOptions) {
  const introTimelineRef = useRef<gsap.core.Timeline | null>(null);

  const playIntro = (isReducedMotion = false) => {
    if (!scopeRef.current) return;

    const ctx = gsap.context(() => {
      // If reduced motion is enabled, show everything statically without animation
      if (isReducedMotion) {
        gsap.set('[data-intro-overlay]', { opacity: 0, display: 'none' });
        gsap.set('[data-headline-letter]', { opacity: 1, y: 0, filter: 'none' });
        gsap.set('[data-road-band]', { scaleX: 1 });
        gsap.set('[data-mid-dash-layer]', { opacity: 1 });
        gsap.set('[data-car-group]', { x: 0, opacity: 1 });
        gsap.set('[data-stat-card]', { opacity: 1, y: 0 });
        gsap.set('[data-scroll-hint]', { opacity: 1 });
        onComplete?.();
        return;
      }

      // Stop scroll during intro animation
      stopScroll?.();

      const tl = gsap.timeline({
        onComplete: () => {
          // Remove filter from letters for optimal rendering performance
          gsap.set('[data-headline-letter]', { clearProps: 'filter' });
          startScroll?.();
          onComplete?.();
        },
      });

      introTimelineRef.current = tl;

      // Initial state setups
      gsap.set('[data-intro-overlay]', { opacity: 1 });
      gsap.set('[data-headline-letter]', {
        opacity: 0,
        y: HERO_CONFIG.intro.headlineInitialY,
        filter: `blur(${HERO_CONFIG.intro.headlineInitialBlur}px)`,
      });
      gsap.set('[data-road-band]', { scaleX: 0, transformOrigin: 'left center' });
      gsap.set('[data-mid-dash-layer]', { opacity: 0 });
      gsap.set('[data-car-group]', { x: `${HERO_CONFIG.intro.carInitialOffsetVw}vw`, opacity: 1 });
      gsap.set('[data-stat-card]', { opacity: 0, y: HERO_CONFIG.intro.statsInitialY });
      gsap.set('[data-scroll-hint]', { opacity: 0 });

      // t=0.0: Page fades in from black (0.6s)
      tl.to('[data-intro-overlay]', {
        opacity: 0,
        duration: HERO_CONFIG.intro.fadeInDuration,
        ease: 'power2.out',
        onComplete: () => {
          gsap.set('[data-intro-overlay]', { display: 'none' });
        },
      }, 0);

      // t=0.2: Headline letters fade & deblur in (0.9s)
      tl.to('[data-headline-letter]', {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: HERO_CONFIG.intro.headlineDuration,
        stagger: HERO_CONFIG.intro.headlineStagger,
        ease: 'power3.out',
      }, HERO_CONFIG.intro.headlineDelay);

      // t=0.5: Road band expands from left (0.9s, expo.out) and lane dashes fade in
      tl.to('[data-road-band]', {
        scaleX: 1,
        duration: HERO_CONFIG.intro.roadDuration,
        ease: 'expo.out',
      }, HERO_CONFIG.intro.roadDelay);

      tl.to('[data-mid-dash-layer]', {
        opacity: 1,
        duration: 0.6,
        ease: 'power2.out',
      }, HERO_CONFIG.intro.roadDelay + 0.2);

      // t=0.7: Car slides in from -35vw to start position (1.2s, power3.out)
      tl.to('[data-car-group]', {
        x: 0,
        duration: HERO_CONFIG.intro.carDuration,
        ease: 'power3.out',
      }, HERO_CONFIG.intro.carDelay);

      // Speed lines flash during car entry and retract to resting length
      tl.fromTo('[data-speed-line]', {
        scaleX: 0,
        opacity: 0,
      }, {
        scaleX: 1,
        opacity: 0.9,
        duration: 0.4,
        ease: 'power2.out',
      }, HERO_CONFIG.intro.carDelay)
      .to('[data-speed-line]', {
        scaleX: HERO_CONFIG.scroll.speedLines.restScaleX,
        opacity: HERO_CONFIG.scroll.speedLines.restOpacity,
        duration: 0.6,
        ease: 'power3.out',
      }, HERO_CONFIG.intro.carDelay + 0.4);

      // t=1.3: Stats cards fade and translate in (0.8s, power2.out)
      tl.to('[data-stat-card]', {
        opacity: 1,
        y: 0,
        duration: HERO_CONFIG.intro.statsDuration,
        stagger: HERO_CONFIG.intro.statsStagger,
        ease: 'power2.out',
      }, HERO_CONFIG.intro.statsDelay);

      // Show scroll hint
      tl.to('[data-scroll-hint]', {
        opacity: 1,
        duration: 0.5,
        ease: 'power2.out',
      }, HERO_CONFIG.intro.statsDelay + 0.5);
    }, scopeRef);

    return () => ctx.revert();
  };

  return { playIntro, introTimelineRef };
}
