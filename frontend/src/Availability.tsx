import React from "react";
import { useNavigate } from "react-router-dom";
import './RevisionSchedule.css';

interface AvailabilityBlock {
  start: string;
  end: string;
  dayOfWeek: string;
}

// Mock availability data
const mockAvailability: { [key: string]: AvailabilityBlock[] } = {
  "2025-05-26": [{ start: "09:00", end: "12:00", dayOfWeek: "Monday" }],
  "2025-05-27": [{ start: "14:00", end: "17:00", dayOfWeek: "Tuesday" }],
  "2025-05-28": [{ start: "10:00", end: "13:00", dayOfWeek: "Wednesday" }],
  "2025-05-29": [{ start: "15:00", end: "18:00", dayOfWeek: "Thursday" }],
  "2025-05-30": [{ start: "09:00", end: "11:00", dayOfWeek: "Friday" }],
  "2025-05-31": [{ start: "13:00", end: "16:00", dayOfWeek: "Saturday" }],
  "2025-06-01": [{ start: "11:00", end: "14:00", dayOfWeek: "Sunday" }],
};

const TimeColumn: React.FC = () => {
  const hours = Array.from({ length: 13 }, (_, i) => i + 8); // 8 AM to 8 PM
  
  return (
    <div className="time-column">
      {hours.map((hour) => (
        <div key={hour} className="time-slot">
          {hour === 12 ? '12 PM' : hour > 12 ? `${hour - 12} PM` : `${hour} AM`}
        </div>
      ))}
    </div>
  );
};

const DayColumn: React.FC<{
  date: Date;
  blocks: AvailabilityBlock[];
  dayName: string;
}> = ({ date, blocks, dayName }) => {
  return (
    <div className="day-column">
      <div className="day-header">
        <div className="day-name">{dayName}</div>
        <div className="date">{date.getDate()}</div>
      </div>
      <div className="sessions-container">
        {blocks.map((block, idx) => {
          const startHour = parseInt(block.start.split(':')[0]);
          const endHour = parseInt(block.end.split(':')[0]);
          const top = (startHour - 8) * 40; // Relative to 8 AM
          const height = (endHour - startHour) * 40;
          
          return (
            <div
              key={idx}
              className="session-block"
              style={{
                top: `${top}px`,
                height: `${height}px`,
              }}
            >
              <div className="session-content">
                <div className="subject">Available</div>
                <div className="time">
                  {block.start} - {block.end}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const WeeklySchedule: React.FC = () => {
  // Use current week
  const currentDate = new Date("2025-05-29");
  const monday = new Date(currentDate);
  monday.setDate(currentDate.getDate() - currentDate.getDay() + 1);

  const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const weekDates = weekDays.map((_, i) => {
    const date = new Date(monday);
    date.setDate(monday.getDate() + i);
    return date;
  });

  return (
    <div className="weekly-schedule">
      <div className="schedule-container">
        <TimeColumn />
        {weekDates.map((date, i) => (
          <DayColumn
            key={date.toString()}
            date={date}
            dayName={weekDays[i]}
            blocks={mockAvailability[date.toISOString().split('T')[0]] || []}
          />
        ))}
      </div>
    </div>
  );
};

const Availability: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <header className="bg-white shadow rounded-lg mb-6">
        <div className="px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-semibold">Your Availability</h1>
          <div className="space-x-4">
            <button
              onClick={() => navigate('/add-availability')}
              className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700"
            >
              Add Availability
            </button>
            <button
              onClick={() => navigate('/')}
              className="text-gray-600 hover:text-gray-900"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </header>

      <main className="bg-white shadow rounded-lg p-6">
        <div className="max-w-6xl mx-auto">
          <WeeklySchedule />
        </div>
      </main>
    </div>
  );
};

export default Availability;
