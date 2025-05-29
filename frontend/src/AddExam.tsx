import React from "react";
import { useNavigate } from "react-router-dom";

const AddExam: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <header className="bg-white shadow rounded-lg mb-6">
        <div className="px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-semibold">Add Exam</h1>
          <button
            onClick={() => navigate('/exams')}
            className="text-gray-600 hover:text-gray-900"
          >
            Back to Exams
          </button>
        </div>
      </header>

      <main className="bg-white shadow rounded-lg p-6">
        <div className="text-center">AddExam</div>
      </main>
    </div>
  );
};

export default AddExam;
