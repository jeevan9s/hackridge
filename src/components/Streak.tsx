import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, PlusCircle, Award, Flame, Trash2 } from 'lucide-react';

// Utility function to format dates as YYYY-MM-DD
function formatDate(day, month = 11, year = 2023) {
  const d = String(day).padStart(2, '0');
  const m = String(month + 1).padStart(2, '0');
  return `${year}-${m}-${d}`;
}

export default function Streak() {
  const [monthlyGoals, setMonthlyGoals] = useState({});
  const [newGoalsInput, setNewGoalsInput] = useState({}); 
  // { dayNumber: "new goal text" }

  const daysInDecember = 31;
  const currentYear = 2023;
  const currentMonth = 11;
  const LOCAL_STORAGE_KEY = 'december_health_goals';

  // Load from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        if (typeof parsedData === 'object' && parsedData !== null) {
          setMonthlyGoals(parsedData);
        }
      } catch (error) {
        console.error("Error parsing local storage data:", error);
      }
    }
  }, []);

  // Save to localStorage whenever monthlyGoals changes
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(monthlyGoals));
  }, [monthlyGoals]);

  const handleAddGoal = (day, text) => {
    const dateKey = formatDate(day, currentMonth, currentYear);
    const newGoal = {
      id: (typeof crypto !== 'undefined' && crypto.randomUUID) ? crypto.randomUUID() : Math.random().toString(36).substring(2),
      text,
      completed: false,
    };

    setMonthlyGoals((prev) => {
      const existingDay = prev[dateKey] || { date: dateKey, goals: [] };
      return {
        ...prev,
        [dateKey]: {
          ...existingDay,
          goals: [...existingDay.goals, newGoal],
        },
      };
    });
  };

  const handleToggleGoal = (day, goalId) => {
    const dateKey = formatDate(day, currentMonth, currentYear);

    setMonthlyGoals((prev) => {
      const dayData = prev[dateKey];
      if (!dayData) return prev;

      const updatedGoals = dayData.goals.map((goal) =>
        goal.id === goalId ? { ...goal, completed: !goal.completed } : goal
      );

      return {
        ...prev,
        [dateKey]: {
          ...dayData,
          goals: updatedGoals,
        },
      };
    });
  };

  const handleRemoveGoal = (day, goalId) => {
    const dateKey = formatDate(day, currentMonth, currentYear);

    setMonthlyGoals((prev) => {
      const dayData = prev[dateKey];
      if (!dayData) return prev;

      const updatedGoals = dayData.goals.filter((goal) => goal.id !== goalId);

      return {
        ...prev,
        [dateKey]: {
          ...dayData,
          goals: updatedGoals,
        },
      };
    });
  };

  const isDayComplete = (day) => {
    const dateKey = formatDate(day, currentMonth, currentYear);
    const dayGoals = monthlyGoals[dateKey]?.goals || [];
    return dayGoals.length > 0 && dayGoals.every((goal) => goal.completed);
  };

  const calculateStreak = () => {
    let streak = 0;
    for (let day = 1; day <= daysInDecember; day++) {
      if (isDayComplete(day)) {
        streak++;
      } else {
        break;
      }
    }
    return streak;
  };

  const currentStreak = calculateStreak();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-6 lg:p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <Award className="w-8 h-8 text-green-600" />
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-emerald-600">
              December Health Goals
            </h1>
          </div>
          <motion.div 
            className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Flame className="w-5 h-5 text-orange-500" />
            <span className="text-lg font-semibold text-gray-800">
              {currentStreak} Day{currentStreak !== 1 ? 's' : ''} Streak
            </span>
          </motion.div>
        </div>

        {/* Only two columns per row */}
        <div className="w-62 gap-4">
          {Array.from({ length: daysInDecember }, (_, i) => i + 1).map((day) => {
            const dateKey = formatDate(day, currentMonth, currentYear);
            const dayGoals = monthlyGoals[dateKey]?.goals || [];
            const newGoalText = newGoalsInput[day] || '';
            const [isHovered, setIsHovered] = useState(false);

            const addGoalForDay = () => {
              if (newGoalText.trim() !== '') {
                handleAddGoal(day, newGoalText);
                // Clear the input for that day
                setNewGoalsInput((prev) => ({ ...prev, [day]: '' }));
              }
            };

            const totalGoals = dayGoals.length;
            const completedGoals = dayGoals.filter((g) => g.completed).length;
            const dayCompletionPercent = totalGoals === 0 ? 0 : Math.round((completedGoals / totalGoals) * 100);

            return (
              <motion.div
                key={day}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 mb-4"
                initial={{ opacity: 0, y: 0 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: day * 0.03 }}
                onHoverStart={() => setIsHovered(true)}
                onHoverEnd={() => setIsHovered(false)}
              >
                <div className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="font-semibold text-gray-700">December {day}</h2>
                    {isDayComplete(day) && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      >
                        <CheckCircle2 className="w-5 h-5 text-green-500" />
                      </motion.div>
                    )}
                  </div>

                  <div className="mb-4">
                    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-green-500 to-emerald-500"
                        initial={{ width: 0 }}
                        animate={{ width: `${dayCompletionPercent}%` }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                      />
                    </div>
                    <p className="mt-2 text-sm text-gray-600">
                      {completedGoals} of {totalGoals} completed
                    </p>
                  </div>

                  <div className="space-y-2 min-h-[100px] max-h-[200px] overflow-y-auto custom-scrollbar">
                    <AnimatePresence>
                      {dayGoals.map((goal) => (
                        <motion.div
                          key={goal.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 20 }}
                          className="group"
                        >
                          <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors duration-200 ">
                            <input
                              type="checkbox"
                              checked={goal.completed}
                              onChange={() => handleToggleGoal(day, goal.id)}
                              className="w-4 h-4 rounded border-gray-300 text-green-600 focus:ring-green-500 transition-colors duration-200 "
                            />
                            <span className={`text-sm flex-1  ${goal.completed ? 'line-through text-gray-400 ' : 'text-gray-700'} transition-all duration-200`}>
                              {goal.text}
                            </span>
                            <button
                              onClick={() => handleRemoveGoal(day, goal.id)}
                              className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-white"
                              title="Remove goal"
                            >
                              <Trash2 className="w-4 h-4 text-red-500 hover:text-red-600" />
                            </button>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>

                  <div className="mt-4 space-y-2">
                    <div className="relative">
                      <input
                        type="text"
                        value={newGoalText}
                        onChange={(e) => setNewGoalsInput((prev) => ({ ...prev, [day]: e.target.value }))}
                        onKeyDown={(e) => e.key === 'Enter' && addGoalForDay()}
                        placeholder="Add a health goal..."
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500/50 text-sm transition-all duration-200 bg-white"
                      />
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={addGoalForDay}
                        className="absolute right-2 bg-white border-gray-200 border-2"
                      >
                        <PlusCircle className="w-5 h-5 text-green-600" />
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
