import React from "react";
import { useNavigate } from "react-router-dom";
import "./Exams.css";

interface Exam {
  id: string;
  name: string;
  subject: string;
  readiness: number;
}

// Mock exam data
const mockExams: Exam[] = [
  { id: "1", name: "Advanced Mathematics", subject: "Mathematics", readiness: 75 },
  { id: "2", name: "Physics Mechanics", subject: "Physics", readiness: 60 },
  { id: "3", name: "Organic Chemistry", subject: "Chemistry", readiness: 85 },
  { id: "4", name: "Cell Biology", subject: "Biology", readiness: 45 },
  { id: "5", name: "Literature Analysis", subject: "English", readiness: 90 },
];

const ProgressBar: React.FC<{ percent: number }> = ({ percent }) => (
  <div className="progress-container">
    <div
      className="progress-bar"
      style={{ width: `${percent}%` }}
    >
      <span className="progress-text">{percent}%</span>
    </div>
  </div>
);

const ExamCard: React.FC<{ exam: Exam }> = ({ exam }) => {
  const navigate = useNavigate();

  return (
    <div className="exam-card">
      <h3 className="text-xl font-semibold">{exam.name}</h3>
      <p>{exam.subject}</p>
      <div>
        <ProgressBar percent={exam.readiness} />
        <div className="flex justify-end">
          <button
            onClick={() => navigate(`/exams/${exam.id}`)}
            className="exam-button"
          >
            Exam Details
          </button>
        </div>
      </div>
    </div>
  );
};

const Exams: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <header className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-semibold text-white">Your Exams</h1>
          </div>
          <div className="flex gap-4">
            <button
              onClick={() => navigate('/')}
              className="exam-button"
            >
              Back
            </button>
            <button
              onClick={() => navigate('/add-exam')}
              className="exam-button"
            >
              Add Exam
            </button>
          </div>
        </div>
      </header>

      <main className="space-y-6">
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockExams.map((exam) => (
            <ExamCard key={exam.id} exam={exam} />
          ))}
        </section>
      </main>
    </div>
  );
};

export default Exams;
