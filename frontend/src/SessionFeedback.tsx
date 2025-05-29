import React from "react";
import { useNavigate } from "react-router-dom";

// Mock data for recent sessions
const recentSessions = [
  { id: 1, subject: "Mathematics", topic: "Calculus", date: "2024-05-25", time: "10:00 AM" },
  { id: 2, subject: "Physics", topic: "Mechanics", date: "2024-05-26", time: "2:00 PM" },
  { id: 3, subject: "Chemistry", topic: "Organic Chemistry", date: "2024-05-27", time: "5:00 PM" },
  { id: 4, subject: "Biology", topic: "Cell Structure", date: "2024-05-28", time: "3:00 PM" },
  { id: 5, subject: "English", topic: "Literature", date: "2024-05-29", time: "11:00 AM" },
];

const SessionFeedback: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <header className="bg-white shadow rounded-lg mb-6">
        <div className="px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-semibold">Session Feedback</h1>
          <button
            onClick={() => navigate('/')}
            className="text-gray-600 hover:text-gray-900"
          >
            Back to Dashboard
          </button>
        </div>
      </header>

      <main className="bg-white shadow rounded-lg p-6">
        <div className="grid gap-4">
          {recentSessions.map((session) => (
            <button
              key={session.id}
              onClick={() => navigate(`/session-feedback/${session.id}`)}
              className="bg-white p-4 rounded-lg shadow border hover:border-blue-500 transition-colors text-left"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-lg">{session.subject}</h3>
                  <p className="text-gray-600">{session.topic}</p>
                </div>
                <div className="text-right text-sm text-gray-500">
                  <p>{session.date}</p>
                  <p>{session.time}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </main>
    </div>
  );
};

export default SessionFeedback;
