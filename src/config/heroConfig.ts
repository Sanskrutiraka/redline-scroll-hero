/**
 * Hero animation tuning constants and choreography configuration.
 * All motion parameters, offsets, durations and smooth scroll options are centralized here.
 */

export const HERO_CONFIG = {
  // Smooth scroll settings (Lenis)
  lenis: {
    lerp: 0.08,
    duration: 1.2,
    smoothWheel: true,
    wheelMultiplier: 1.0,
    touchMultiplier: 2.0,
  },

  // Pin distances for ScrollTrigger
  pin: {
    desktop: '+=300%',
    mobile: '+=200%',
  },

  // Scroll scrub smoothing in seconds
  scrub: 1,

  // Initial load animation (Intro) parameters
  intro: {
    fadeInDuration: 0.6,
    headlineDelay: 0.2,
    headlineDuration: 0.9,
    headlineStagger: 0.035,
    headlineInitialY: 36,
    headlineInitialBlur: 12, // in px
    roadDelay: 0.5,
    roadDuration: 0.9,
    carDelay: 0.7,
    carDuration: 1.2,
    carInitialOffsetVw: -35, // starts at -35vw
    statsDelay: 1.3,
    statsDuration: 0.8,
    statsStagger: 0.14,
    statsInitialY: 24,
    totalDurationEstimate: 2.3,
  },

  // Scroll timeline progress positions and offsets
  scroll: {
    // Car travel & steering
    car: {
      endMarginVw: 6, // car travels up to (window.innerWidth - carWidth - 6vw)
      scaleTarget: 1.08,
      steeringRotationPeakDeg: -1.5,
      steeringPeakProgress: 0.5,
      underglowStartOpacity: 0.5,
      underglowMidOpacity: 0.95,
      underglowEndOpacity: 0.6,
    },

    // Speed lines behind car
    speedLines: {
      peakProgress: 0.5,
      restScaleX: 0.15,
      peakScaleX: 1.0,
      restOpacity: 0.25,
      peakOpacity: 0.9,
    },

    // Headline letter dispersion
    headline: {
      startProgress: 0.15,
      endProgress: 0.55,
      spreadPxDesktop: 14,
      spreadPxMobile: 8,
      deltaY: -24,
      targetOpacity: 0.3,
    },

    // Stats countup triggers and timing (progress fractions)
    stats: {
      startBaseProgress: 0.20,
      intervalProgress: 0.18,
      durationProgress: 0.22,
    },

    // Parallax background layers
    parallax: {
      farLayerDeltaVw: -8,   // Faint horizon grid
      midDashDeltaVw: -25,   // Lane dash strip
      glowFollowRatio: 0.6,  // Glow moves at 60% of car speed
    },

    // Scroll indicator threshold to fade out
    scrollHintFadeProgress: 0.05,
  },
} as const;

export default HERO_CONFIG;
