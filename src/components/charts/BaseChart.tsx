import { ReactElement, type ReactNode } from 'react';
import { ResponsiveContainer } from 'recharts';

interface BaseChartProps {
  children: ReactElement;
}

export function BaseChart({ children }: BaseChartProps) {
  return (
    // @ts-ignore
    <ResponsiveContainer width="100%" height="100%">
      
      {children}
    </ResponsiveContainer>
  );
}