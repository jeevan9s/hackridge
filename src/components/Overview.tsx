// src/components/views/Overview.jsx
import React from 'react';
import { BloodPressureChart } from '@/components/health/BloodPressureChart';
import { HeartRateChart } from '@/components/health/HeartRateChart';
import { CoreTemperatureChart } from '@/components/health/CoreTemperatureChart';
import { BloodOxygenChart } from '@/components/health/BloodOxygen';
import { RespiratoryRateChart } from '@/components/health/RespiratoryRateChart';

const Overview = () => {
  return (
    <div className="mx-auto max-w-7xl space-y-8">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <BloodPressureChart />
        <HeartRateChart />
        <CoreTemperatureChart />
        <BloodOxygenChart />
        <RespiratoryRateChart />
        {/* Add more components as needed */}
      </div>
    </div>
  );
};

export default Overview;
