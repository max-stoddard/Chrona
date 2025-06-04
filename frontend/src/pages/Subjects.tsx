import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import SubjectCard from '../components/SubjectCard';
import supabase from '../../utils/supabase';
import '../styles/subjectspage.css';
import '../styles/typography.css';

interface Subject {
  subject_id: string;
  user_id: string;
  subject_name: string;
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
        // 1. Authenticate (session is cached by Supabase client)
        await supabase.auth.signOut();
        const {
          data: { user },
          error: authError,
        } = await supabase.auth.signInWithPassword({
          email: 'test@test.com',
          password: 'testuser',
        });
        if (authError || !user) throw authError;

        // 2. Call Spring‑Boot API with user ID to fetch subjects
        const api = import.meta.env.VITE_API_BASE_URL as string;
        const res = await fetch(`${api}/api/users/${user.id}/subjects`);
        if (!res.ok) throw new Error(await res.text());

        const data = await res.json();
        console.log("Loaded subjects:", data);
        setSubjects(data);
      } catch (err) {
        /* eslint-disable no-console */
        console.error('Failed to load subjects', err);
      } finally {
        setLoading(false);
      }
    };

    init();
  }, []);

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
              <SubjectCard key={s.subject_id} name={s.subject_name} onView={() => navigate(`/subjects/${s.subject_id}`)} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}