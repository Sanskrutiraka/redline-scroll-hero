'use client';

import React from 'react';

interface HeadlineProps {
  className?: string;
}

export const Headline: React.FC<HeadlineProps> = ({ className = '' }) => {
  const word1 = 'WELCOME';
  const word2 = 'ITZFIZZ';

  let globalIndex = 0;

  return (
    <div className={`w-full flex justify-center items-center text-center select-none ${className}`}>
      <h1
        aria-label="Welcome Itzfizz"
        className="headline-fluid flex flex-wrap justify-center items-center gap-x-[1.2em] gap-y-2 text-text font-display uppercase tracking-headline font-medium"
      >
        {/* Word 1: WELCOME */}
        <span className="inline-block whitespace-nowrap">
          {word1.split('').map((char) => {
            const currentIndex = globalIndex++;
            return (
              <span
                key={`w1-${currentIndex}`}
                data-headline-letter
                data-letter-index={currentIndex}
                aria-hidden="true"
                className="inline-block will-change-transform"
              >
                {char}
              </span>
            );
          })}
        </span>

        {/* Word 2: ITZFIZZ */}
        <span className="inline-block whitespace-nowrap">
          {word2.split('').map((char) => {
            const currentIndex = globalIndex++;
            return (
              <span
                key={`w2-${currentIndex}`}
                data-headline-letter
                data-letter-index={currentIndex}
                aria-hidden="true"
                className="inline-block will-change-transform"
              >
                {char}
              </span>
            );
          })}
        </span>
      </h1>
    </div>
  );
};

export default Headline;
