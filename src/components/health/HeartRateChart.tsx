import { useState, useEffect } from 'react';
import { Area, AreaChart, Tooltip, XAxis, YAxis } from 'recharts';
import { ChartContainer } from '@/components/charts/ChartContainer';
import { BaseChart } from '@/components/charts/BaseChart';
import { getCurrentTimestamp } from '@/lib/date-utils';
import type { HeartRateReading } from '@/types/health';

const chartConfig = {
  xAxis: {
    dataKey: "timestamp",
    fontSize: 12,
    tickLine: false,
    axisLine: true,
    stroke: "hsl(var(--muted-foreground))",
    strokeWidth: 1,
    padding: { left: 16, right: 16 },
  },
  yAxis: {
    fontSize: 12,
    tickLine: false,
    axisLine: false,
    stroke: "hsl(var(--muted-foreground))",
    strokeWidth: 1,
    width: 48,
  },
  tooltip: {
    cursor: { stroke: "hsl(var(--muted))" },
    contentStyle: {
      backgroundColor: "hsl(var(--background))",
      border: "1px solid hsl(var(--border))",
      borderRadius: "var(--radius)",
      boxShadow: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
    },
  },
} as const;

const LOCAL_STORAGE_KEY = 'heartRateReadings';

// Define default readings
const defaultReadings: HeartRateReading[] = [
  { timestamp: '9:00 AM', bpm: 72 },
  { timestamp: '11:00 AM', bpm: 75 },
  { timestamp: '1:00 PM', bpm: 70 },
];

export function HeartRateChart() {
  const [readings, setReadings] = useState<HeartRateReading[]>(() => {
    if (typeof window !== 'undefined') { // Ensure we're on the client side
      const storedReadings = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (storedReadings) {
        try {
          return JSON.parse(storedReadings);
        } catch (error) {
          console.error('Error parsing stored readings:', error);
          return defaultReadings;
        }
      }
    }
    return defaultReadings;
  });

  const [bpm, setBpm] = useState('');

  // Save readings to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(readings));
      console.log('Saved readings to localStorage:', readings);
    } catch (error) {
      console.error('Failed to save readings to localStorage:', error);
    }
  }, [readings]);

  const addReading = () => {
    if (bpm) {
      const bpmNum = parseInt(bpm, 10);
      
      if (isNaN(bpmNum) || bpmNum <= 0) {
        alert('Please enter a valid number for BPM.');
        return;
      }

      const newReading: HeartRateReading = {
        timestamp: getCurrentTimestamp(), // Ensure this returns a string like '3:00 PM'
        bpm: bpmNum,
      };
      setReadings(prevReadings => [...prevReadings, newReading]);
      setBpm('');
    } else {
      alert('Please enter a BPM value.');
    }
  };

  // Optional: Restrict input to numeric values by handling onChange
  const handleBpmChange = (value: string) => {
    // Allow only digits
    if (/^\d*$/.test(value)) {
      setBpm(value);
    }
  };

  return (
    <ChartContainer
      title="Resting Heart Rate"
      className="col-span-3"
      inputs={[
        {
          value: bpm,
          onChange: handleBpmChange, // Use the custom handler
          placeholder: 'BPM...',
          // 'type' property removed to align with ChartContainer's expected props
        },
      ]}
      onAdd={addReading}
    >
      <BaseChart>
        <AreaChart data={readings} margin={{ top: 16, right: 16, bottom: 0, left: 0 }}>
          <XAxis {...chartConfig.xAxis} />
          <YAxis {...chartConfig.yAxis} domain={['dataMin - 5', 'dataMax + 5']} />
          <Tooltip {...chartConfig.tooltip} />
          <Area
            type="monotone"
            dataKey="bpm"
            stroke="hsl(var(--primary))"
            fill="hsl(var(--primary)/0.2)"
            strokeWidth={2}
            dot={{ strokeWidth: 2, fill: 'hsl(var(--background))' }}
            activeDot={{ strokeWidth: 2, r: 6 }}
            animationDuration={1000}
          />
        </AreaChart>
      </BaseChart>
    </ChartContainer>
  );
}
