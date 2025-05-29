import React from "react";
import { NavLink } from "react-router-dom";

// ---------------------------
// Type Definitions
// ---------------------------
interface Session {
  subject: string;
  topic: string;
  date: string; // ISO‑format date string – convert to Date if you need parsing
  time: string; // Human‑readable time (HH:MM AM/PM)
}

// ---------------------------
// Mock Data (replace with API data later)
// ---------------------------
const upcomingSessions: Session[] = [
  { subject: "Mathematics", topic: "Calculus", date: "2024-03-15", time: "10:00 AM" },
  { subject: "Physics", topic: "Mechanics", date: "2024-03-15", time: "2:00 PM" },
  { subject: "Chemistry", topic: "Organic Chemistry", date: "2024-03-15", time: "5:00 PM" },
];

// ---------------------------
// Helper Components
// ---------------------------
const ProgressBar: React.FC<{ percent: number }> = ({ percent }) => (
  <div className="w-full bg-gray-300 h-3 rounded-full">
    <div
      className="bg-black h-3 rounded-full"
      style={{ width: `${percent}%` }}
      aria-valuenow={percent}
      aria-valuemin={0}
      aria-valuemax={100}
    />
  </div>
);

const SessionTable: React.FC<{ sessions: Session[] }> = ({ sessions }) => (
  <table className="w-full text-sm border">
    <thead>
      <tr className="bg-gray-200 text-left">
        <th className="p-2">Subject</th>
        <th className="p-2">Topic</th>
        <th className="p-2">Date</th>
        <th className="p-2">Time</th>
      </tr>
    </thead>
    <tbody>
      {sessions.map(({ subject, topic, date, time }) => (
        <tr key={`${subject}-${topic}-${date}-${time}`} className="border-t">
          <td className="p-2">{subject}</td>
          <td className="p-2 text-blue-600">{topic}</td>
          <td className="p-2">{date}</td>
          <td className="p-2">{time}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

// ---------------------------
// Main Dashboard Component
// ---------------------------
const Dashboard: React.FC = () => {
  const examProgressPercent = 75; // TODO: Replace with real data


  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <header className="bg-white shadow rounded-lg mb-6">
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <div className="flex items-center space-x-2">
            <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">40</div>
            <span className="text-xl font-bold text-blue-800">Chrona</span>
          </div>
          <nav className="space-x-4 text-sm font-medium">
            {[
                {label: "Dashboard", path: "/"},
                {label: "Schedule", path: "/revision-schedule"},
                {label: "Exams", path: "/exams"},
                {label: "Settings", path: "/settings"}
            ].map(({label, path}) => (
              <NavLink
                key={label}
                to={path}
                className={({ isActive }) => [
                    "hover:text-blue-600",
                    isActive ? "text-blue-800 font-semibold" : "text-gray-600",
                ].join(" ")
            }
            >
                {label}
            </NavLink>
            ))}
          </nav>
          <div className="flex items-center space-x-2">
            <div className="rounded-full bg-blue-600 text-white w-8 h-8 flex items-center justify-center font-bold">40</div>
            {/* Avatar – swap with user photo */}
            <img
              src="https://via.placeholder.com/40"
              alt="Avatar"
              className="rounded-full w-8 h-8"
            />
          </div>
        </div>
      </header>

      {/* Body */}
      <main className="bg-white shadow rounded-lg p-6 mb-6">
        <h1 className="text-2xl font-semibold mb-4">Welcome back, Sarah!</h1>

        {/* Upcoming Sessions */}
        <section className="mb-6">
          <NavLink to="/revision-schedule" className="inline-block hover:text-blue-600">
            <h2 className="text-lg font-semibold mb-2">Upcoming Revision Sessions</h2>
          </NavLink>
          <SessionTable sessions={upcomingSessions} />
        </section>

        {/* Exam Readiness */}
        <section className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Exam Readiness</h2>
          <p className="text-sm mb-1">Overall Progress for Summer Exams 2025</p>
          <ProgressBar percent={examProgressPercent} />
          <p className="text-sm text-green-700 mt-1">You’re on track to achieve your goals!</p>
        </section>

        {/* AI Insights */}
        <section className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
          <div className="md:col-span-2">
            <h2 className="text-lg font-semibold mb-2">AI Insights & Tips</h2>
            <p className="font-bold text-sm">Focus on High‑Yield Topics</p>
            <p className="text-sm mb-2">
              Based on your performance, prioritize topics with higher weightage in the upcoming exams.
            </p>
          </div>
          <img
            src="https://via.placeholder.com/200x120?text=Bulb"
            alt="Light bulb"
            className="rounded-md mx-auto"
          />
        </section>

        {/* Quick Actions */}
        <section className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Quick Actions</h2>
          <div className="flex flex-wrap gap-4">
            <NavLink 
              to="/session-feedback"
              className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600"
            >
              Session Feedback
            </NavLink>
            <button className="bg-gray-200 text-black px-4 py-2 rounded shadow">Missed a session?</button>
            <NavLink 
              to="/availability"
              className="bg-gray-200 text-black px-4 py-2 rounded shadow hover:bg-gray-300"
            >
              Availability
            </NavLink>
          </div>
        </section>

        {/* Motivational Quote */}
        <section>
          <h2 className="text-lg font-semibold mb-2">Motivational Quote</h2>
          <p className="italic text-sm">
            “The only way to do great work is to love what you do.” – Steve Jobs
          </p>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
