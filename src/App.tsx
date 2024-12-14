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

        <div className="flex flex-1 relative">
          {/* Main Scrollable Area */}
          <main className="flex-1 overflow-auto p-6 scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-200">
            <div className="mx-auto max-w-7xl space-y-8">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <BloodPressureChart />
                <HeartRateChart />
                <CoreTemperatureChart />
                <BloodOxygenChart />
                <RespiratoryRateChart />
              </div>
            </div>
          </main>

          {/* ChatBot - Fixed on the Right Side */}
          <div className="absolute right-0 top-0 bottom-0 w-80 p-4 bg-white shadow-lg z-10">
            <ChatBot />
          </div>
        </div>
      </div>
    </div>
  );
}

  

export default App;