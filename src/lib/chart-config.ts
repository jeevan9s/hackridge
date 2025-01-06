import { type XAxisProps, type YAxisProps, type TooltipProps } from 'recharts';

export const defaultAxisConfig = {
  stroke: 'hsl(var(--muted-foreground))',
  strokeWidth: 1,
  fontSize: 12,
  tickLine: false,
} as const;

export const xAxisConfig: XAxisProps = {
  ...defaultAxisConfig,
  axisLine: true,
  padding: { left: 16, right: 16 },
};

export const yAxisConfig: YAxisProps = {
  ...defaultAxisConfig,
  axisLine: false,
  width: 48,
};

export const tooltipConfig: TooltipProps<any, any> = {
  cursor: { stroke: 'hsl(var(--muted))' },
  contentStyle: {
    backgroundColor: 'hsl(var(--background))',
    border: '1px solid hsl(var(--border))',
    borderRadius: 'var(--radius)',
    boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  },
};