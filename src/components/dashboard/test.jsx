// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// function AlarmReminder() {
//   const [reminderMessage, setReminderMessage] = useState('');
//   const [alarmTriggered, setAlarmTriggered] = useState(false);

//   // Function to trigger alarm
//   const triggerAlarm = (message) => {
//     if (message.toLowerCase() === 'eating') {
//       setAlarmTriggered(true);
//       setTimeout(() => {
//         alert('⏰ Reminder: Time to eat!'); // Alarm action
//       }, 1000); // Delay for 1 second (can adjust as needed)
//     }
//   };

//   // Fetch the reminder message from the cloud API
//   const fetchReminder = async () => {
//     try {
//       // Replace with your cloud API endpoint
//       const response = await axios.get('https://api.example.com/reminder');
//       const message = response.data.message || 'No reminder set';
//       setReminderMessage(message);
//       triggerAlarm(message); // Check and trigger alarm
//     } catch (error) {
//       console.error('Error fetching reminder:', error);
//       setReminderMessage('Failed to retrieve reminder.');
//     }
//   };

//   // Fetch the reminder message on component mount
//   useEffect(() => {
//     fetchReminder();
//   }, []);

//   return (
//     <div className="p-4 bg-gray-100 rounded-lg shadow-md w-80">
//       <h2 className="text-lg font-bold mb-2">Eating Reminder</h2>

//       {/* Display Reminder Message */}
//       <p className="mb-4">{reminderMessage || 'Fetching reminder...'}</p>

//       {/* Alarm Triggered */}
//       {alarmTriggered && (
//         <p className="mt-4 text-red-500 font-semibold">🚨 Alarm Triggered! 🚨</p>
//       )}
//     </div>
//   );
// }

// export default AlarmReminder;
