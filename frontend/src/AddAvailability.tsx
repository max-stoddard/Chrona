import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

// Generate times every 15 minutes from 00:00 to 23:45
const generateTimeOptions = () => {
  const times = [];
  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += 15) {
      const formattedHour = hour.toString().padStart(2, "0");
      const formattedMinute = minute.toString().padStart(2, "0");
      times.push(`${formattedHour}:${formattedMinute}`);
    }
  }
  return times;
};

const timeOptions = generateTimeOptions();

const AddAvailability: React.FC = () => {
  const navigate = useNavigate();
  const [day, setDay] = useState(daysOfWeek[0]);
  const [startTime, setStartTime] = useState(timeOptions[32]); // Default to 08:00
  const [endTime, setEndTime] = useState(timeOptions[36]); // Default to 09:00

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Handle the form submission
    console.log({ day, startTime, endTime });
    // Navigate back to availability page after saving
    navigate('/availability');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <header className="bg-white shadow rounded-lg mb-6">
        <div className="px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-semibold">Add Availability</h1>
          <button
            onClick={() => navigate('/availability')}
            className="text-gray-600 hover:text-gray-900"
          >
            Back to Availability
          </button>
        </div>
      </header>

      <main className="bg-white shadow rounded-lg p-6">
        <form onSubmit={handleSubmit} className="space-y-6 max-w-md">
          <div>
            <label htmlFor="day" className="block text-sm font-medium text-gray-700">
              Day of Week
            </label>
            <select
              id="day"
              value={day}
              onChange={(e) => setDay(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              {daysOfWeek.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="startTime" className="block text-sm font-medium text-gray-700">
              Start Time
            </label>
            <select
              id="startTime"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              {timeOptions.map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="endTime" className="block text-sm font-medium text-gray-700">
              End Time
            </label>
            <select
              id="endTime"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              {timeOptions.map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Save Availability
          </button>
        </form>
      </main>
    </div>
  );
};

export default AddAvailability;
