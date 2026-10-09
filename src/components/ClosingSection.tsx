'use client';

import React from 'react';

export const ClosingSection: React.FC = () => {
  return (
    <section className="relative z-10 w-full min-h-[60vh] bg-bg flex flex-col justify-between items-center py-24 px-6 border-t border-[#ECE6DA]/10">
      <div className="max-w-4xl mx-auto text-center my-auto">
        <span className="label-micro text-accent tracking-[0.25em] mb-4 block">
          FINISH LINE
        </span>
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-medium text-text uppercase tracking-wide leading-tight">
          Engineered for precision. Driven by motion.
        </h2>
        <p className="mt-6 text-muted text-sm sm:text-base max-w-lg mx-auto font-sans leading-relaxed">
          Top-view choreography built with GSAP ScrollTrigger, Lenis smooth scrolling, and hardware-accelerated transforms.
        </p>
      </div>

      <footer className="w-full max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 pt-12 border-t border-[#ECE6DA]/5 text-xs text-muted">
        <span className="font-display uppercase tracking-widest text-[10px] text-text/80">
          Redline Hero &copy; {new Date().getFullYear()}
        </span>
        <span className="tracking-wider">
          Built by Sanskruti Raka ·{" "}
          <a href="https://github.com/sanskrutiraka/redline-scroll-hero" target="_blank" rel="noopener noreferrer" className="text-accent hover:text-accent/80 transition-colors underline underline-offset-4">
            View source
          </a>
        </span>
      </footer>
    </section>
  );
};

export default ClosingSection;
