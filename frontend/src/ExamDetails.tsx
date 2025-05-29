import React from "react";
import { useNavigate, useParams } from "react-router-dom";

const ExamDetails: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // Mock exams data to get exam details
  const exams = {
    "1": { name: "Advanced Mathematics", subject: "Mathematics" },
    "2": { name: "Physics Mechanics", subject: "Physics" },
    "3": { name: "Organic Chemistry", subject: "Chemistry" },
    "4": { name: "Cell Biology", subject: "Biology" },
    "5": { name: "Literature Analysis", subject: "English" },
  };

  const exam = exams[id as keyof typeof exams];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <header className="bg-white shadow rounded-lg mb-6">
        <div className="px-6 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold">{exam?.name}</h1>
            <p className="text-gray-600">{exam?.subject}</p>
          </div>
          <button
            onClick={() => navigate('/exams')}
            className="text-gray-600 hover:text-gray-900"
          >
            Back to Exams
          </button>
        </div>
      </header>

      <main className="bg-white shadow rounded-lg p-6">
        <div className="text-center">Exam Details Page</div>
      </main>
    </div>
  );
};

export default ExamDetails;
