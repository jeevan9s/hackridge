import { useState, useEffect } from 'react';
import { Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';
import { ChartContainer } from '@/components/charts/ChartContainer';
import { BaseChart } from '@/components/charts/BaseChart';
import { getCurrentTimestamp } from '@/lib/date-utils';
import type { BloodPressureReading } from '@/types/health';

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

const LOCAL_STORAGE_KEY = 'bloodPressureReadings';

// Define default readings
const defaultReadings: BloodPressureReading[] = [
  { timestamp: '9:00 AM', systolic: 120, diastolic: 80 },
  { timestamp: '11:00 AM', systolic: 122, diastolic: 82 },
  { timestamp: '1:00 PM', systolic: 118, diastolic: 79 },
];

export function BloodPressureChart() {
  const [readings, setReadings] = useState<BloodPressureReading[]>(() => {
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

  const [systolic, setSystolic] = useState('');
  const [diastolic, setDiastolic] = useState('');

  // Save readings to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(readings));
    } catch (error) {
      console.error('Failed to save readings to localStorage:', error);
    }
  }, [readings]);

  const addReading = () => {
    if (systolic && diastolic) {
      const systolicNum = parseInt(systolic, 10);
      const diastolicNum = parseInt(diastolic, 10);
      
      if (isNaN(systolicNum) || isNaN(diastolicNum)) {
        alert('Please enter valid numbers for systolic and diastolic.');
        return;
      }

      if (systolicNum > diastolicNum) {
        const newReading: BloodPressureReading = {
          timestamp: getCurrentTimestamp(), // Ensure this returns a string like '3:00 PM'
          systolic: systolicNum,
          diastolic: diastolicNum,
        };
        setReadings(prevReadings => [...prevReadings, newReading]);
        setSystolic('');
        setDiastolic('');
      } else {
        alert('Systolic value must be greater than diastolic value.');
      }
    } else {
      alert('Please fill in both systolic and diastolic values.');
    }
  };

  return (
    <ChartContainer
      title="Blood Pressure"
      className="col-span-4"
      inputs={[
        {
          value: systolic,
          onChange: setSystolic, // Correctly accepts a string
          placeholder: 'Systolic...',
          // 'type' property removed to fix TypeScript error
        },
        {
          value: diastolic,
          onChange: setDiastolic, // Correctly accepts a string
          placeholder: 'Diastolic...',
          // 'type' property removed to fix TypeScript error
        },
      ]}
      onAdd={addReading}
    >
      <BaseChart>
        <LineChart data={readings} margin={{ top: 16, right: 16, bottom: 0, left: 0 }}>
          <XAxis {...chartConfig.xAxis} />
          <YAxis {...chartConfig.yAxis} domain={['dataMin - 10', 'dataMax + 10']} />
          <Tooltip {...chartConfig.tooltip} />
          <Line
            type="monotone"
            dataKey="systolic"
            stroke="hsl(var(--destructive))"
            strokeWidth={2}
            dot={{ strokeWidth: 2, fill: 'hsl(var(--background))' }}
            activeDot={{ strokeWidth: 2, r: 6 }}
            animationDuration={1000}
          />
          <Line
            type="monotone"
            dataKey="diastolic"
            stroke="hsl(var(--primary))"
            strokeWidth={2}
            dot={{ strokeWidth: 2, fill: 'hsl(var(--background))' }}
            activeDot={{ strokeWidth: 2, r: 6 }}
            animationDuration={1000}
          />
        </LineChart>
      </BaseChart>
    </ChartContainer>
  );
}
