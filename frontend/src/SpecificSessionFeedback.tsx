import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const SpecificSessionFeedback: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [feedback, setFeedback] = useState("");
  const [sessionFeeling, setSessionFeeling] = useState(50);
  const [overallFit, setOverallFit] = useState(50);

  // Mock session data (in real app, fetch based on id)
  const session = {
    id,
    subject: "Mathematics",
    topic: "Calculus",
    date: "2024-05-25",
    time: "10:00 AM",
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({
      sessionId: id,
      feedback,
      sessionFeeling,
      overallFit,
    });
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <header className="bg-white shadow rounded-lg mb-6">
        <div className="px-6 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold">Session Feedback</h1>
            <p className="text-gray-600">
              {session.subject} - {session.topic}
            </p>
          </div>
          <button
            onClick={() => navigate('/session-feedback')}
            className="text-gray-600 hover:text-gray-900"
          >
            Back to Sessions
          </button>
        </div>
      </header>

      <main className="bg-white shadow rounded-lg p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="feedback"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Your Feedback
            </label>
            <textarea
              id="feedback"
              rows={5}
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Share your thoughts about this session..."
            />
          </div>

          <div>
            <label
              htmlFor="sessionFeeling"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              How did the session feel? ({sessionFeeling}%)
            </label>
            <input
              type="range"
              id="sessionFeeling"
              min="0"
              max="100"
              value={sessionFeeling}
              onChange={(e) => setSessionFeeling(Number(e.target.value))}
              className="w-full"
            />
          </div>

          <div>
            <label
              htmlFor="overallFit"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              How well did it fit your learning journey? ({overallFit}%)
            </label>
            <input
              type="range"
              id="overallFit"
              min="0"
              max="100"
              value={overallFit}
              onChange={(e) => setOverallFit(Number(e.target.value))}
              className="w-full"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700"
            >
              Save Feedback
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default SpecificSessionFeedback;
