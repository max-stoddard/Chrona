import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { supabase } from '../utils/supabase';
import '../styles/subjectdetails.css';

interface Exam {
  exam_id: string;
  exam_name: string;
  exam_date: string;
  exam_difficulty: number;
  exam_confidence: number;
  exam_seconds_spent: number;
}

interface SubjectDetails {
  subject_id: string;
  subject_name: string;
  subject_seconds_spent: number;
  exams: Exam[];
}

export default function SubjectDetailsPage() {
  const { subjectId = '' } = useParams<{ subjectId: string }>();   // route param
  const [subject, setSubject] = useState<SubjectDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        // assume user already signed in (cached by Supabase)
        const {
          data: { user },
          error,
        } = await supabase.auth.getUser();
        if (error || !user) throw error ?? new Error('No user session');

        const api = import.meta.env.VITE_API_BASE_URL as string;
        // Use the correct backend route
        const res = await fetch(
          `${api}/api/users/${user.id}/subjects/${subjectId}`
        );
        
        if (!res.ok) throw new Error(await res.text());

        const data = await res.json();
        setSubject(data);
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error('Failed to load subject', err);
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [subjectId]);

  const mapDifficultyToText = (difficulty: number): string => {
    switch (difficulty) {
      case 0: return 'Easy';
      case 1: return 'Medium';
      case 2: return 'Hard';
      default: return 'Unknown';
    }
  };

  const mapConfidenceToText = (confidence: number): string => {
    switch (confidence) {
      case 0: return 'Not confident';
      case 1: return 'Somewhat confident';
      case 2: return 'Very confident';
      default: return '—';
    }
  };

  if (loading) return (
    <div className="subject-details-page">
      <Navbar />
      <main className="container">
        <p className="body-1 text-center">Loading…</p>
      </main>
    </div>
  );
  
  if (!subject) return (
    <div className="subject-details-page">
      <Navbar />
      <main className="container">
        <p className="body-1 text-center">Subject not found.</p>
        <Link to="/subjects" className="button-secondary" style={{ display: 'block', width: 'fit-content', margin: '20px auto' }}>
          Back to Subjects
        </Link>
      </main>
    </div>
  );

  return (
    <div className="subject-details-page">
      <Navbar />

      <main className="container">
        <header className="header-row">
          <Link to="/subjects" className="body-2 back-link">← Back</Link>
          <h1 className="heading-details">{subject.subject_name}</h1>
        </header>

        <h2 className="heading-2">Exams</h2>

        {subject.exams.length === 0 ? (
          <p className="body-2">No exams yet.</p>
        ) : (
          <div className="exam-table">
            <div className="table-head">
              <span className="th flex2">Title</span>
              <span className="th">Date</span>
              <span className="th">Difficulty</span>
              <span className="th">Confidence</span>
            </div>

            {subject.exams.map((exam) => (
              <div className="table-row" key={exam.exam_id}>
                <span className="td flex2">{exam.exam_name}</span>
                <span className="td">{exam.exam_date}</span>
                <span className="td">{mapDifficultyToText(exam.exam_difficulty)}</span>
                <span className="td">{mapConfidenceToText(exam.exam_confidence)}</span>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}