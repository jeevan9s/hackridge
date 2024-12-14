// src/components/health/RespiratoryRateChart.tsx

import { useState, useEffect } from 'react';
import { Area, AreaChart, Tooltip, XAxis, YAxis } from 'recharts';
import { ChartContainer } from '@/components/charts/ChartContainer';
import { BaseChart } from '@/components/charts/BaseChart';
import { getCurrentTimestamp } from '@/lib/date-utils';
import type { RespiratoryRateReading } from '@/types/health';

const chartConfig = {
  xAxis: {
    dataKey: 'timestamp',
    fontSize: 12,
    tickLine: false,
    axisLine: true,
    stroke: '#A0AEC0', // Tailwind CSS gray-400 equivalent
    strokeWidth: 1,
    padding: { left: 16, right: 16 },
  },
  yAxis: {
    fontSize: 12,
    tickLine: false,
    axisLine: false,
    stroke: '#A0AEC0',
    strokeWidth: 1,
    width: 48,
  },
  tooltip: {
    cursor: { stroke: '#CBD5E0' },
    contentStyle: {
      backgroundColor: '#FFFFFF',
      border: '1px solid #E2E8F0',
      borderRadius: '0.375rem',
      boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    },
  },
} as const;

const LOCAL_STORAGE_KEY = 'respiratoryRateReadings';

const defaultReadings: RespiratoryRateReading[] = [
  { timestamp: '9:00 AM', breathsPerMinute: 12 },
  { timestamp: '11:00 AM', breathsPerMinute: 14 },
  { timestamp: '1:00 PM', breathsPerMinute: 13 },
];

export function RespiratoryRateChart() {
  const [readings, setReadings] = useState<RespiratoryRateReading[]>(() => {
    if (typeof window !== 'undefined') {
      const storedReadings = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (storedReadings) {
        try {
          return JSON.parse(storedReadings) as RespiratoryRateReading[];
        } catch (error) {
          console.error('Error parsing stored readings:', error);
          return defaultReadings;
        }
      }
    }
    return defaultReadings;
  });

  const [breathsPerMinute, setBreathsPerMinute] = useState('');
  const [error, setError] = useState<string | null>(null);

  // Save readings to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(readings));
    } catch (error) {
      console.error('Failed to save readings to localStorage:', error);
    }
  }, [readings]);

  const addReading = () => {
    if (breathsPerMinute) {
      const bpmNum = parseInt(breathsPerMinute);
      if (isNaN(bpmNum) || bpmNum < 1 || bpmNum > 50) {
        setError('Please enter a valid respiratory rate (1-50 breaths per minute).');
        return;
      }

      const newReading: RespiratoryRateReading = {
        timestamp: getCurrentTimestamp(),
        breathsPerMinute: bpmNum,
      };
      setReadings([...readings, newReading]);
      setBreathsPerMinute('');
      setError(null);
    } else {
      setError('Please enter a respiratory rate value.');
    }
  };

  return (
    <ChartContainer
      title="Respiratory Rate"
      className="col-span-4" // Same size as Blood Pressure and Blood Oxygen Charts
      inputs={[
        {
          value: breathsPerMinute,
          onChange: setBreathsPerMinute,
          placeholder: 'Respir...',
        },
      ]}
      onAdd={addReading}
    >
      {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
      <BaseChart>
        <AreaChart data={readings} margin={{ top: 16, right: 16, bottom: 0, left: 0 }}>
          <XAxis {...chartConfig.xAxis} />
          <YAxis {...chartConfig.yAxis} domain={[1, 50]} /> {/* Y-axis range for respiratory rate */}
          <Tooltip {...chartConfig.tooltip} />
          <Area
            type="monotone"
            dataKey="breathsPerMinute"
            stroke="#F59E0B" // Amber color for Respiratory Rate
            fill="rgba(245, 158, 11, 0.2)" // Amber with opacity
            strokeWidth={2}
            dot={{ strokeWidth: 2, fill: '#FFFFFF' }}
            activeDot={{ strokeWidth: 2, r: 6 }}
            animationDuration={1000}
          />
        </AreaChart>
      </BaseChart>
    </ChartContainer>
  );
}
