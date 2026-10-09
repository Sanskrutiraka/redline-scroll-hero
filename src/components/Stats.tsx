'use client';

import React from 'react';
import { statsData } from '@/data/stats';
import StatCard from './StatCard';

interface StatsProps {
  className?: string;
}

export const Stats: React.FC<StatsProps> = ({ className = '' }) => {
  return (
    <div
      data-stats-container
      className={`w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}
    >
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-12">
        {statsData.map((stat, index) => (
          <StatCard key={stat.id} stat={stat} index={index} />
        ))}
      </div>
    </div>
  );
};

export default Stats;
