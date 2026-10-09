export interface StatItem {
  id: string;
  value: number;
  suffix: string;
  label: string;
}

export const statsData: StatItem[] = [
  {
    id: 'stat-pickup-1',
    value: 58,
    suffix: '%',
    label: 'Increase in pick up point use',
  },
  {
    id: 'stat-calls-1',
    value: 23,
    suffix: '%',
    label: 'Decreased in customer phone calls',
  },
  {
    id: 'stat-pickup-2',
    value: 27,
    suffix: '%',
    label: 'Increase in pick up point use',
  },
  {
    id: 'stat-calls-2',
    value: 40,
    suffix: '%',
    label: 'Decreased in customer phone calls',
  },
];
