import { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Sidebar } from '@/components/layout/Sidebar';
import { BloodPressureChart } from '@/components/health/BloodPressureChart';
import { HeartRateChart } from '@/components/health/HeartRateChart';
import { CoreTemperatureChart } from './components/health/CoreTemperatureChart';
import { BloodOxygenChart } from './components/health/BloodOxygen';
import { RespiratoryRateChart } from './components/health/RespiratoryRateChart';
import ChatBot from './components/health/ChatBot';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-background">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar onMenuClick={() => setSidebarOpen(true)} />

        <main className="flex-1 overflow-auto p-6 scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-200">
          <div className="mx-auto max-w-7xl space-y-8">
            {/* Adjust the grid layout */}
            <div className="grid gap-6 md:grid-cols-7">
              {/* Health Charts */}
              <div className="md:col-span-4 space-y-6">
                <BloodPressureChart />
                <HeartRateChart />
                <CoreTemperatureChart />
                <BloodOxygenChart />
                <RespiratoryRateChart />
              </div>

              {/* ChatBot Section */}
              <div className="md:col-span-3 flex items-center justify-center">
                <div className="w-full h-full rounded-lg shadow-md bg-white p-4">
                  <ChatBot />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

  

export default App;