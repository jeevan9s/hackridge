// src/components/health/CoreTemperatureChart.tsx

import { useState, useEffect } from 'react';
import { Area, AreaChart, Tooltip, XAxis, YAxis } from 'recharts';
import { ChartContainer } from '@/components/charts/ChartContainer';
import { BaseChart } from '@/components/charts/BaseChart';
import { getCurrentTimestamp } from '@/lib/date-utils';
import type { CoreTemperatureReading } from '@/types/health';

const chartConfig = {
  xAxis: {
    dataKey: "timestamp",
    fontSize: 12,
    tickLine: false,
    axisLine: true,
    stroke: "#A0AEC0", // Tailwind CSS gray-400 equivalent
    strokeWidth: 1,
    padding: { left: 16, right: 16 },
  },
  yAxis: {
    fontSize: 12,
    tickLine: false,
    axisLine: false,
    stroke: "#A0AEC0", // Tailwind CSS gray-400 equivalent
    strokeWidth: 1,
    width: 48,
  },
  tooltip: {
    cursor: { stroke: "#CBD5E0" }, // Tailwind CSS gray-300 equivalent
    contentStyle: {
      backgroundColor: "#FFFFFF",
      border: "1px solid #E2E8F0", // Tailwind CSS gray-200 equivalent
      borderRadius: "0.375rem", // Tailwind CSS rounded-md
      boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
    },
  },
} as const;

const LOCAL_STORAGE_KEY = 'coreTemperatureReadings';

// Define default readings
const defaultReadings: CoreTemperatureReading[] = [
  { timestamp: '9:00 AM', temperature: 36.5 },
  { timestamp: '11:00 AM', temperature: 36.7 },
  { timestamp: '1:00 PM', temperature: 36.6 },
];

export function CoreTemperatureChart() {
  const [readings, setReadings] = useState<CoreTemperatureReading[]>(() => {
    if (typeof window !== 'undefined') { // Ensure we're on the client side
      const storedReadings = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (storedReadings) {
        try {
          return JSON.parse(storedReadings) as CoreTemperatureReading[];
        } catch (error) {
          console.error('Error parsing stored readings:', error);
          return defaultReadings;
        }
      }
    }
    return defaultReadings;
  });

  const [temperature, setTemperature] = useState('');

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
    if (temperature) {
      const tempNum = parseFloat(temperature);
      
      if (isNaN(tempNum) || tempNum <= 0) {
        alert('Please enter a valid number for temperature.');
        return;
      }

      const newReading: CoreTemperatureReading = {
        timestamp: getCurrentTimestamp(), // Ensure this returns a string like '3:00 PM'
        temperature: tempNum,
      };
      setReadings(prevReadings => [...prevReadings, newReading]);
      setTemperature('');
    } else {
      alert('Please enter a temperature value.');
    }
  };

  // Restrict input to numeric values with optional decimal
  const handleTemperatureChange = (value: string) => {
    if (/^\d*\.?\d*$/.test(value)) { // Allows digits and at most one decimal point
      setTemperature(value);
    }
  };

  return (
    <ChartContainer
      title="Core Temperature"
      className="col-span-6 md:col-span-6 lg:col-span-8" // Responsive column spans
      inputs={[
        {
          value: temperature,
          onChange: handleTemperatureChange, // Custom handler to restrict input
          placeholder: 'Tempera...',
        },
      ]}
      onAdd={addReading}
    >
      <BaseChart>
        <AreaChart 
          data={readings} 
          margin={{ top: 16, right: 16, bottom: 0, left: 0 }}
          // width and height are responsive; adjust if necessary
        >
          <XAxis {...chartConfig.xAxis} />
          <YAxis {...chartConfig.yAxis} domain={['dataMin - 1', 'dataMax + 1']} />
          <Tooltip {...chartConfig.tooltip} />
          <Area
            type="monotone"
            dataKey="temperature"
            stroke="#FF4500" // Orangish-Red color for the line
            fill="rgba(255, 69, 0, 0.2)" // Orangish-Red color with 20% opacity for the area
            strokeWidth={2}
            dot={{ strokeWidth: 2, fill: '#FFFFFF' }} // White dots for data points
            activeDot={{ strokeWidth: 2, r: 6 }}
            animationDuration={1000}
          />
        </AreaChart>
      </BaseChart>
    </ChartContainer>
  );
}
