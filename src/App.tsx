// src/App.jsx
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { Sidebar } from '@/components/layout/Sidebar';
import ChatBot from './components/health/ChatBot';
import Streak from './components/Streak';
import InfoForm from './components/Info';
import Overview from './components/Overview';
import AlarmPage from './components/Alert';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <Router>
      <div className="flex h-screen bg-background">
        {/* Sidebar */}
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Navbar */}
          <Navbar onMenuClick={() => setSidebarOpen(true)} />

          {/* Main Layout */}
          <div className="flex h-full">
            {/* Scrollable Content Area */}
            <div className="flex-1 overflow-auto p-6 scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-200">
              <Routes>
                <Route path="/" element={<Overview />} />
                <Route path="/analytics" element={<Streak />} />
                <Route path="/alert" element={<AlarmPage />} />
                {/* Wrap InfoForm in a container that sets its width */}
                <Route
                  path="/info"
                  element={
                    <div className="max-w-4xl mx-auto w-full">
                      <InfoForm />
                    </div>
                  }
                />
              </Routes>
            </div>

            {/* ChatBot - Only show if not on Info page */}
            {/* If you still need to hide ChatBot, use a conditional: */}
            {/* {location.pathname !== '/info' && (...) } */}
            <ChatBot />
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
