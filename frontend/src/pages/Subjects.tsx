import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import SubjectCard from '../components/SubjectCard';
import { useRequireAuth } from '../hooks/useRequireAuth';
import { supabase } from '../utils/supabase';
import '../styles/subjectspage.css';
import '../styles/typography.css';
import type { Exam } from '../types/types';

interface Subject {
  subject_id: string;
  user_id: string;
  subject_name: string;
  subject_seconds_spent?: number;
  exams: Exam[];
}

export default function SubjectsPage() {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const userId = useRequireAuth();

  useEffect(() => {
    if (!userId) return;
    const init = async () => {
      try {
        const { data: { user }, error: authError } = await supabase.auth.getUser();
        if (authError || !user) throw authError;
    
        /* 2. fetch subjects */
        const api = import.meta.env.VITE_API_BASE_URL as string;
        const res = await fetch(`${api}/api/users/${user.id}/subjects`);
        if (!res.ok) throw new Error(await res.text());
    
        const baseSubjects: Omit<Subject, 'exams'>[] = await res.json();
    
        /* 3. attach top-two exams to each subject */
        const enriched: Subject[] = await Promise.all(
          baseSubjects.map(async (s) => {
            try {
              // Use the correct route structure for fetching exams
              const examRes = await fetch(`${api}/api/users/${user.id}/subjects/${s.subject_id}/exams`);
              if (!examRes.ok) throw new Error(await examRes.text());
              
              const allExams = await examRes.json();
              
              // Map backend exam structure to frontend structure
              const mappedExams: Exam[] = allExams.map((e: any) => ({
                exam_id: e.exam_id,
                subject_id: e.subject_id,
                exam_name: e.exam_name,
                exam_date: e.exam_date,
                exam_difficulty: e.exam_difficulty,
              }));

              // sort by soonest date and keep only the first 2
              mappedExams.sort(
                (a: Exam, b: Exam) =>
                  new Date(a.exam_date).getTime() -
                  new Date(b.exam_date).getTime(),
              );
              return { ...s, exams: mappedExams.slice(0, 2) };
            } catch {
              // if exam fetch fails, fall back to empty list
              return { ...s, exams: [] };
            }
          }),
        );
    
        setSubjects(enriched);
        setError(null);
      } catch (err) {
        console.error('Failed to load subjects', err);
        setError('Failed to load subjects. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    init();
  }, [userId]);

  const deleteSubject = async (subject_id: string) => {
    try {
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError || !user) throw authError;

      const api = import.meta.env.VITE_API_BASE_URL as string;
      const res = await fetch(`${api}/api/users/${user.id}/subjects/${subject_id}`, {
        method: 'DELETE',
      });

      if (!res.ok) throw new Error(await res.text());

      setSubjects(subjects.filter((s) => s.subject_id !== subject_id));
    } catch (err) {
      console.error("Failed to delete subject", err);
      alert("Failed to delete subject. Please try again later.");
    }
  };

  return (
    <div className="subjects-page">
      <Navbar />

      <div className="content">
        <header className="header-row">
          <h1 className="heading-1">Subjects</h1>
          <Link to="/add-subject" className="add-subject button-text">
            Add Subject
          </Link>
        </header>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '20px' }}>
            <p className="body-1">Loading your subjects...</p>
          </div>
        ) : error ? (
          <div style={{ textAlign: 'center', padding: '20px' }}>
            <p className="body-1" style={{ color: 'red' }}>{error}</p>
            <button 
              className="button-secondary" 
              onClick={() => window.location.reload()}
              style={{ marginTop: '10px' }}
            >
              Try Again
            </button>
          </div>
        ) : subjects.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '20px' }}>
            <p className="body-1">You haven't added any subjects yet.</p>
            <Link to="/add-subject" className="add-subject button-text" style={{ display: 'inline-block', marginTop: '10px' }}>
              + Add your first subject
            </Link>
          </div>
        ) : (
          <div className="grid">
            {subjects.map((s) => (
              <SubjectCard 
                key={s.subject_id} 
                name={s.subject_name} 
                exams={s.exams} 
                timeSpentSeconds={s.subject_seconds_spent}
                onView={() => navigate(`/subjects/${s.subject_id}`)} 
                onDelete={() => deleteSubject(s.subject_id)} 
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}