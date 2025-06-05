import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import supabase from '../../utils/supabase';
import '../styles/subjectdetails.css';

interface Exam {
  name: string;
  date: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  confidence?: 'Not confident' | 'Somewhat confident' | 'Very confident';
}

interface SubjectDetails {
  subject_id: string;
  subject_name: string;
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
        // SubjectDetailsPage.tsx (only the fetch URL line changes)
        const res = await fetch(
            `${api}/api/users/${user.id}/subjects/${subjectId}`   // ✅ now exists
        );
        
        if (!res.ok) throw new Error(await res.text());

        setSubject(await res.json());
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error('Failed to load subject', err);
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [subjectId]);

  if (loading) return <p className="body-1 text-center">Loading…</p>;
  if (!subject) return <p className="body-1 text-center">Subject not found.</p>;

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

            {subject.exams.map((exam, i) => (
              <div className="table-row" key={i}>
                <span className="td flex2">{exam.name}</span>
                <span className="td">{exam.date}</span>
                <span className="td">{exam.difficulty}</span>
                <span className="td">{exam.confidence ?? '—'}</span>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
