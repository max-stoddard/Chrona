import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './RevisionSchedule.css';

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

interface SessionsData {
  [key: string]: Array<{
    start: string;
    end: string;
    subject: string;
    topic: string;
  }>;
}

// Mock data for revision sessions (2-hour sessions)
const mockSessions: SessionsData = {
  "2025-05-26": [{ start: "14:00", end: "16:00", subject: "Mathematics", topic: "Calculus" }],
  "2025-05-27": [{ start: "14:00", end: "16:00", subject: "Physics", topic: "Mechanics" }],
  "2025-05-28": [{ start: "14:00", end: "16:00", subject: "Chemistry", topic: "Organic Chemistry" }],
  "2025-05-29": [{ start: "14:00", end: "16:00", subject: "Biology", topic: "Cell Structure" }],
  "2025-05-30": [{ start: "14:00", end: "16:00", subject: "English", topic: "Literature" }],
  "2025-05-31": [{ start: "14:00", end: "16:00", subject: "History", topic: "World War II" }],
  "2025-06-01": [{ start: "14:00", end: "16:00", subject: "Geography", topic: "Climate Change" }],
};

interface Session {
  start: string;
  end: string;
  subject: string;
  topic: string;
}

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
  sessions: Session[];
  dayName: string;
}> = ({ date, sessions, dayName }) => {
  return (
    <div className="day-column">
      <div className="day-header">
        <div className="day-name">{dayName}</div>
        <div className="date">{date.getDate()}</div>
      </div>
      <div className="sessions-container">
        {sessions.map((session, idx) => {
          const startHour = parseInt(session.start.split(':')[0]);
          const endHour = parseInt(session.end.split(':')[0]);
          const top = (startHour - 8) * 60; // Relative to 8 AM
          const height = (endHour - startHour) * 60;
          
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
                <div className="subject">{session.subject}</div>
                <div className="topic">{session.topic}</div>
                <div className="time">
                  {session.start} - {session.end}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const WeeklySchedule: React.FC<{ selectedDate: Date }> = ({ selectedDate }) => {
  const monday = new Date(selectedDate);
  monday.setDate(selectedDate.getDate() - selectedDate.getDay() + 1);

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
            sessions={mockSessions[date.toISOString().split('T')[0]] || []}
          />
        ))}
      </div>
    </div>
  );
};

const RevisionSchedule: React.FC = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState<Value>(new Date("2025-05-29"));

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <header className="bg-white shadow rounded-lg mb-6">
        <div className="px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-semibold">Revision Schedule</h1>
          <button
            onClick={() => navigate('/')}
            className="text-gray-600 hover:text-gray-900"
          >
            Back to Dashboard
          </button>
        </div>
      </header>

      <main className="bg-white shadow rounded-lg p-6">
        <div className="max-w-6xl mx-auto">
          <div className="calendar-container bg-gray-900 p-4 rounded-lg mb-6">
            <Calendar
              onChange={setSelectedDate}
              value={selectedDate}
              className="w-full border-0 shadow-none"
            />
          </div>
          {selectedDate instanceof Date && (
            <WeeklySchedule selectedDate={selectedDate} />
          )}
        </div>
      </main>
    </div>
  );
};

export default RevisionSchedule;
