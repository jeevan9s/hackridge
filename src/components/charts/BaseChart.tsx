import { type ReactNode } from 'react';
import { ResponsiveContainer } from 'recharts';

interface BaseChartProps {
  children: ReactNode;
}

export function BaseChart({ children }: BaseChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      {children}
    </ResponsiveContainer>
  );
}