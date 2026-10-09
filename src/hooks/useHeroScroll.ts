'use client';

import { useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { HERO_CONFIG } from '@/config/heroConfig';
import { statsData } from '@/data/stats';

interface UseHeroScrollOptions {
  scopeRef: React.RefObject<HTMLDivElement | null>;
}

export function useHeroScroll({ scopeRef }: UseHeroScrollOptions) {
  const masterTimelineRef = useRef<gsap.core.Timeline | null>(null);

  const initScrollAnimation = () => {
    if (!scopeRef.current) return;

    const mm = gsap.matchMedia(scopeRef);

    // 1. DESKTOP CONTEXT (>= 768px, no reduced motion)
    mm.add(
      '(min-width: 768px) and (prefers-reduced-motion: no-preference)',
      () => {
        setupChoreography({
          isMobile: false,
          pinDistance: HERO_CONFIG.pin.desktop,
          spreadPx: HERO_CONFIG.scroll.headline.spreadPxDesktop,
        });
      }
    );

    // 2. MOBILE CONTEXT (< 768px, no reduced motion)
    mm.add(
      '(max-width: 767px) and (prefers-reduced-motion: no-preference)',
      () => {
        setupChoreography({
          isMobile: true,
          pinDistance: HERO_CONFIG.pin.mobile,
          spreadPx: HERO_CONFIG.scroll.headline.spreadPxMobile,
        });
      }
    );

    // 3. PREFERS REDUCED MOTION CONTEXT
    mm.add('(prefers-reduced-motion: reduce)', () => {
      // Set all stats to full values and active borders
      statsData.forEach((stat, i) => {
        const numEl = scopeRef.current?.querySelector(
          `[data-stat-number][data-stat-index="${i}"]`
        );
        if (numEl) numEl.textContent = stat.value.toString();

        const borderEl = scopeRef.current?.querySelector(
          `[data-stat-border][data-stat-index="${i}"]`
        );
        if (borderEl) gsap.set(borderEl, { scaleX: 1 });
      });

      gsap.set('[data-car-group]', {
        x: '25vw',
        scale: 1,
        rotation: 0,
      });
      gsap.set('[data-progress-bar]', { scaleY: 1 });
      gsap.set('[data-scroll-hint]', { opacity: 0 });
    });

    return () => mm.revert();
  };

  const setupChoreography = ({
    isMobile,
    pinDistance,
    spreadPx,
  }: {
    isMobile: boolean;
    pinDistance: string;
    spreadPx: number;
  }) => {
    if (!scopeRef.current) return;

    // Master scrub timeline synced to ScrollTrigger
    const masterTl = gsap.timeline({
      scrollTrigger: {
        trigger: scopeRef.current,
        start: 'top top',
        end: pinDistance,
        pin: true,
        scrub: HERO_CONFIG.scrub,
        invalidateOnRefresh: true,
        anticipatePin: 1,
      },
      defaults: { ease: 'none' },
    });

    masterTimelineRef.current = masterTl;

    // A. Car Travel Distance calculation (function-based)
    const getCarTravel = () => {
      if (typeof window === 'undefined') return 0;
      const carEl = scopeRef.current?.querySelector('[data-car-group]') as HTMLElement;
      const carWidth = carEl ? carEl.offsetWidth : window.innerWidth * (isMobile ? 0.7 : 0.38);
      const marginPx = (window.innerWidth * (isMobile ? 4 : HERO_CONFIG.scroll.car.endMarginVw)) / 100;
      return Math.max(0, window.innerWidth - carWidth - marginPx);
    };

    // 1. CAR X-TRAVEL across entire scroll (0.0 -> 1.0)
    masterTl.to(
      '[data-car-group]',
      {
        x: getCarTravel,
        ease: 'power1.inOut',
        duration: 1.0,
      },
      0
    );

    // 2. CAR SCALE (1.0 -> 1.08)
    masterTl.to(
      '[data-car-group]',
      {
        scale: HERO_CONFIG.scroll.car.scaleTarget,
        ease: 'power1.inOut',
        duration: 1.0,
      },
      0
    );

    // 3. CAR STEERING ROTATION (0 -> -1.5deg -> 0deg)
    masterTl.to(
      '[data-car-group]',
      {
        rotation: HERO_CONFIG.scroll.car.steeringRotationPeakDeg,
        ease: 'power1.inOut',
        duration: HERO_CONFIG.scroll.car.steeringPeakProgress,
      },
      0
    );
    masterTl.to(
      '[data-car-group]',
      {
        rotation: 0,
        ease: 'power1.inOut',
        duration: 1.0 - HERO_CONFIG.scroll.car.steeringPeakProgress,
      },
      HERO_CONFIG.scroll.car.steeringPeakProgress
    );

    // 4. UNDERGLOW OPACITY SCRUB (0.5 -> 0.95 -> 0.6)
    masterTl.to(
      '[data-car-underglow]',
      {
        opacity: HERO_CONFIG.scroll.car.underglowMidOpacity,
        duration: 0.5,
      },
      0
    );
    masterTl.to(
      '[data-car-underglow]',
      {
        opacity: HERO_CONFIG.scroll.car.underglowEndOpacity,
        duration: 0.5,
      },
      0.5
    );

    // 5. SPEED LINES BELL-SHAPED CURVE (peak at 0.5)
    const speedLines = isMobile
      ? '[data-speed-lines-container] [data-speed-line]:nth-child(-n+3)'
      : '[data-speed-line]';

    masterTl.to(
      speedLines,
      {
        scaleX: HERO_CONFIG.scroll.speedLines.peakScaleX,
        opacity: HERO_CONFIG.scroll.speedLines.peakOpacity,
        duration: HERO_CONFIG.scroll.speedLines.peakProgress,
        ease: 'power2.in',
      },
      0
    );
    masterTl.to(
      speedLines,
      {
        scaleX: HERO_CONFIG.scroll.speedLines.restScaleX,
        opacity: HERO_CONFIG.scroll.speedLines.restOpacity,
        duration: 1.0 - HERO_CONFIG.scroll.speedLines.peakProgress,
        ease: 'power2.out',
      },
      HERO_CONFIG.scroll.speedLines.peakProgress
    );

    // 6. HEADLINE PER-LETTER TRANSFORM DISPERSION (0.15 -> 0.55)
    const letterEls = scopeRef.current?.querySelectorAll('[data-headline-letter]');
    if (letterEls && letterEls.length > 0) {
      const centerIndex = (letterEls.length - 1) / 2;
      const hlDuration =
        HERO_CONFIG.scroll.headline.endProgress -
        HERO_CONFIG.scroll.headline.startProgress;

      letterEls.forEach((letterEl, idx) => {
        const offsetMultiplier = idx - centerIndex;
        const targetX = offsetMultiplier * spreadPx;

        masterTl.to(
          letterEl,
          {
            x: targetX,
            y: HERO_CONFIG.scroll.headline.deltaY,
            opacity: HERO_CONFIG.scroll.headline.targetOpacity,
            duration: hlDuration,
            ease: 'power1.out',
          },
          HERO_CONFIG.scroll.headline.startProgress
        );
      });
    }

    // 7. STATS COUNTUP AND BORDER IGNITION
    statsData.forEach((stat, i) => {
      const startTime =
        HERO_CONFIG.scroll.stats.startBaseProgress +
        i * HERO_CONFIG.scroll.stats.intervalProgress;
      const duration = HERO_CONFIG.scroll.stats.durationProgress;

      const numEl = scopeRef.current?.querySelector(
        `[data-stat-number][data-stat-index="${i}"]`
      ) as HTMLElement | null;

      const borderEl = scopeRef.current?.querySelector(
        `[data-stat-border][data-stat-index="${i}"]`
      ) as HTMLElement | null;

      const counter = { val: 0 };

      // Number countup tween
      if (numEl) {
        masterTl.to(
          counter,
          {
            val: stat.value,
            duration: duration,
            ease: 'power2.out',
            onUpdate: () => {
              numEl.textContent = Math.round(counter.val).toString();
            },
          },
          startTime
        );
      }

      // Border line ignition tween
      if (borderEl) {
        masterTl.to(
          borderEl,
          {
            scaleX: 1,
            duration: duration,
            ease: 'power2.out',
          },
          startTime
        );
      }
    });

    // 8. PARALLAX LAYERS
    if (!isMobile) {
      // Far layer (horizon streaks)
      masterTl.to(
        '[data-far-layer]',
        {
          x: () => -(window.innerWidth * (Math.abs(HERO_CONFIG.scroll.parallax.farLayerDeltaVw) / 100)),
          ease: 'none',
          duration: 1.0,
        },
        0
      );
    }

    // Mid layer (lane dash strip moves in reverse for enhanced speed sensation)
    masterTl.to(
      '[data-mid-dash-layer]',
      {
        x: () => -(window.innerWidth * (Math.abs(HERO_CONFIG.scroll.parallax.midDashDeltaVw) / 100)),
        ease: 'none',
        duration: 1.0,
      },
      0
    );

    // 9. PROGRESS BAR & SCROLL HINT
    masterTl.to(
      '[data-progress-bar]',
      {
        scaleY: 1,
        ease: 'none',
        duration: 1.0,
      },
      0
    );

    masterTl.to(
      '[data-scroll-hint]',
      {
        opacity: 0,
        duration: HERO_CONFIG.scroll.scrollHintFadeProgress,
        ease: 'power1.out',
      },
      0
    );
  };

  return { initScrollAnimation, masterTimelineRef };
}
