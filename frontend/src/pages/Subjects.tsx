import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import SubjectCard from '../components/SubjectCard';
import supabase from '../../utils/supabase';
import '../styles/subjectspage.css';
import '../styles/typography.css';
import type { Exam } from '../types/types';
import { getExams } from '../api/exams';

interface Subject {
  subject_id: string;
  user_id: string;
  subject_name: string;
  exams: Exam[];
}

export default function SubjectsPage() {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    /**
     * Sign‑in with service credentials and pull subjects for the user.
     * Credentials are temporary – replace when real auth is in place.
     */
    const init = async () => {
      try {
        /* 1. authenticate (temp credentials) */
        await supabase.auth.signOut();
        const {
          data: { user },
          error: authError,
        } = await supabase.auth.signInWithPassword({
          email: 'test@test.com',
          password: 'testuser',
        });
        if (authError || !user) throw authError;
    
        /* 2. fetch subjects */
        const api   = import.meta.env.VITE_API_BASE_URL as string;
        const res   = await fetch(`${api}/api/users/${user.id}/subjects`);
        if (!res.ok) throw new Error(await res.text());
    
        const baseSubjects: Omit<Subject, 'exams'>[] = await res.json();
    
        /* 3. attach top-two exams to each subject */
        const enriched: Subject[] = await Promise.all(
          baseSubjects.map(async (s) => {
            try {
              const allExams = await getExams(s.subject_id);
    
              // sort by soonest date and keep only the first 2
              allExams.sort(
                (a, b) =>
                  new Date(a.exam_date).getTime() -
                  new Date(b.exam_date).getTime(),
              );
              return { ...s, exams: allExams.slice(0, 2) };
            } catch {
              // if exam fetch fails, fall back to empty list
              return { ...s, exams: [] };
            }
          }),
        );
    
        setSubjects(enriched);
      } catch (err) {
        /* eslint-disable no-console */
        console.error('Failed to load subjects', err);
      } finally {
        setLoading(false);
      }
    };
    init();
  }, []);

    const deletePage = async (subject_id : String) => {

      try {
        const {
          data: { user },
          error: authError,
        } = await supabase.auth.getUser();

        if (authError || !user)  throw authError;

        

        const api = import.meta.env.VITE_API_BASE_URL as string;
        const res = await fetch(`${api}/api/users/${user.id}/subjects/${subject_id}`, {
          method: 'DELETE',
        });

        if (!res.ok) throw new Error(await res.text());

        setSubjects(subjects.filter((s) => s.subject_id !== subject_id));
    } catch (err) {
      console.error("failed to delete subject", err);
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
          <p className="body-1">Loading…</p>
        ) : (
          <div className="grid">
            {subjects.map((s) => (
              <SubjectCard key={s.subject_id} name={s.subject_name} onView={() => navigate(`/subjects/${s.subject_id}`)} onDelete={()=>deletePage(s.subject_id)} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}