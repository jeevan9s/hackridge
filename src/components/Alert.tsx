import  { useState, useEffect, useRef } from 'react';
import { Clock, Bell, BellOff } from 'lucide-react';

export default function AlarmPage() {
  const [alarmTime, setAlarmTime] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [remainingSeconds, setRemainingSeconds] = useState<number | null>(null);
  const [totalSeconds, setTotalSeconds] = useState<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!alarmTime || !isActive) {
      setRemainingSeconds(null);
      setTotalSeconds(null);
      return;
    }

    const [hours, minutes] = alarmTime.split(':').map(Number);
    const now = new Date();
    const target = new Date();
    target.setHours(hours, minutes, 0, 0);

    let diff = (target.getTime() - now.getTime()) / 1000;
    
    // If time already passed, set for next day
    if (diff <= 0) {
      target.setDate(target.getDate() + 1);
      diff = (target.getTime() - now.getTime()) / 1000;
    }

    setRemainingSeconds(Math.floor(diff));
    setTotalSeconds(Math.floor(diff));
  }, [alarmTime, isActive]);

  useEffect(() => {
    if (remainingSeconds === null || !isActive) return;
    if (remainingSeconds <= 0) {
      handleAlarmTrigger();
      return;
    }

    const interval = setInterval(() => {
      setRemainingSeconds(prev => prev !== null && prev > 0 ? prev - 1 : 0);
    }, 1000);

    return () => clearInterval(interval);
  }, [remainingSeconds, isActive]);

  const handleAlarmTrigger = () => {
    if (audioRef.current) {
      audioRef.current.play();
      setIsActive(false);
    }
  };

  const formatTime = (seconds: number | null): string => {
    if (seconds === null) return '--:--:--';
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const calculateProgress = (): number => {
    if (remainingSeconds === null || totalSeconds === null || totalSeconds === 0) return 0;
    return ((totalSeconds - remainingSeconds) / totalSeconds) * 100;
  };

  const toggleAlarm = () => {
    if (!alarmTime) return;
    setIsActive(!isActive);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  return (
    <div className="min-h-screen m-b-4 bg-white flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
            <Clock className=" h-8 " />
            Alarm Clock
          </h1>
          <button
            onClick={toggleAlarm}
            className={`p-3 rounded-full transition-all duration-300 ${
              isActive 
                ? 'bg-red-100 text-red-500 hover:bg-red-200' 
                : 'bg-transparent text-blue-500 hover:bg-blue-200'
            }`}
          >
            {isActive ? <BellOff className="w-5 h-5" /> : <Bell className="w-6 h-6" />}
          </button>
        </div>

        <div className="mb-8">
          <input
            type="time"
            value={alarmTime}
            onChange={(e) => setAlarmTime(e.target.value)}
            className="w-full text-3xl font-mono bg-gray-50 border-2 border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors duration-200"
          />
        </div>

        <div className="relative mb-6">
          <div className="h-4 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-500 transition-all duration-1000 ease-linear"
              style={{ width: `${calculateProgress()}%` }}
            />
          </div>
        </div>

        <div className="text-center">
          <div className="text-4xl font-mono font-bold text-gray-800 mb-2">
            {formatTime(remainingSeconds)}
          </div>
          <p className="text-gray-500">
            {isActive ? 'Time Remaining' : 'Set your alarm time'}
          </p>
        </div>
      </div>

      <audio
        ref={audioRef}
        src="https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3"
        preload="auto"
        loop
      />
    </div>
  );
}