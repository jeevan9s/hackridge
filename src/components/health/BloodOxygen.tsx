// src/components/health/BloodOxygenChart.tsx

import { useState, useEffect } from 'react';
import { Area, AreaChart, Tooltip, XAxis, YAxis } from 'recharts';
import { ChartContainer } from '@/components/charts/ChartContainer';
import { BaseChart } from '@/components/charts/BaseChart';
import { getCurrentTimestamp } from '@/lib/date-utils';
import type { BloodOxygenReading } from '@/types/health';

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

const LOCAL_STORAGE_KEY = 'bloodOxygenReadings';

const defaultReadings: BloodOxygenReading[] = [
  { timestamp: '9:00 AM', spo2: 98 },
  { timestamp: '11:00 AM', spo2: 97 },
  { timestamp: '1:00 PM', spo2: 96 },
];

export function BloodOxygenChart() {
  const [readings, setReadings] = useState<BloodOxygenReading[]>(() => {
    if (typeof window !== 'undefined') {
      const storedReadings = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (storedReadings) {
        try {
          return JSON.parse(storedReadings) as BloodOxygenReading[];
        } catch (error) {
          console.error('Error parsing stored readings:', error);
          return defaultReadings;
        }
      }
    }
    return defaultReadings;
  });

  const [spo2, setSpo2] = useState('');
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
    if (spo2) {
      const spo2Num = parseInt(spo2);
      if (isNaN(spo2Num) || spo2Num < 0 || spo2Num > 100) {
        setError('Please enter a valid SpO₂ value (0-100).');
        return;
      }

      const newReading: BloodOxygenReading = {
        timestamp: getCurrentTimestamp(),
        spo2: spo2Num,
      };
      setReadings([...readings, newReading]);
      setSpo2('');
      setError(null);
    } else {
      setError('Please enter a SpO₂ value.');
    }
  };

  return (
    <ChartContainer
      title="Blood Oxygen"
      className="col-span-3" // Same as Blood Pressure Chart
      inputs={[
        {
          value: spo2,
          onChange: setSpo2,
          placeholder: 'SpO₂ (%)',
        },
      ]}
      onAdd={addReading}
    >
      {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
      <BaseChart>
        <AreaChart data={readings} margin={{ top: 16, right: 16, bottom: 0, left: 0 }}>
          <XAxis {...chartConfig.xAxis} />
          <YAxis {...chartConfig.yAxis} domain={[90, 100]} /> {/* Y-axis range for SpO₂ */}
          <Tooltip {...chartConfig.tooltip} />
          <Area
            type="monotone"
            dataKey="spo2"
            stroke="#38BDF8" // Light blue color for Blood Oxygen
            fill="rgba(56, 189, 248, 0.2)" // Light blue with opacity
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
