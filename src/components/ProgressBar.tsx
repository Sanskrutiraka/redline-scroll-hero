'use client';

import React from 'react';

export const ProgressBar: React.FC = () => {
  return (
    <div
      aria-hidden="true"
      className="fixed top-0 right-0 h-full w-[2px] z-50 pointer-events-none bg-text/10"
    >
      <div
        data-progress-bar
        className="w-full h-full bg-accent origin-top scale-y-0 will-change-transform shadow-[0_0_10px_rgba(229,50,45,0.8)]"
      />
    </div>
  );
};

export default ProgressBar;
