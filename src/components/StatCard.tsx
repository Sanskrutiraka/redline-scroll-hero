'use client';

import React from 'react';
import { StatItem } from '@/data/stats';

interface StatCardProps {
  stat: StatItem;
  index: number;
}

export const StatCard: React.FC<StatCardProps> = ({ stat, index }) => {
  return (
    <div
      data-stat-card
      data-stat-index={index}
      className="relative flex flex-col items-start pt-4 sm:pt-6 group text-left select-none"
    >
      {/* Top Border Baseline (Muted line) */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 right-0 h-[1px] bg-muted/20 w-full"
      />

      {/* Top Border Active Indicator (Redline) */}
      <div
        data-stat-border
        data-stat-index={index}
        aria-hidden="true"
        className="absolute top-0 left-0 right-0 h-[1px] bg-accent w-full origin-left scale-x-0 will-change-transform"
      />

      {/* Stat Number with Tabular Figures and Suffix */}
      <div className="flex items-baseline gap-0.5 text-text font-display">
        <span
          data-stat-number
          data-target-value={stat.value}
          data-stat-index={index}
          className="stat-number-fluid text-text font-semibold tracking-tight"
        >
          0
        </span>
        <span className="text-xl sm:text-2xl md:text-3xl font-medium text-text/90">
          {stat.suffix}
        </span>
      </div>

      {/* Stat Description */}
      <p className="stat-desc-fluid mt-2 sm:mt-3 text-muted">
        {stat.label}
      </p>
    </div>
  );
};

export default StatCard;
