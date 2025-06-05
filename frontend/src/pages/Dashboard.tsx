import '../styles/dashboard.css';
import '../styles/typography.css';
import '../styles/theme.css';

import Navbar from '../components/Navbar';
import Card from '../components/Card';

import { getSessions } from '../api/session';
import { getSubject, getSubjects } from '../api/subjects';
import { getUserExams } from '../api/exams';
import { useEffect, useState } from 'react';
import { type Subject, type Exam, type Session } from '../types/types';
import { useNavigate } from 'react-router-dom';
import { useRequireAuth } from '../hooks/useRequireAuth';

import playIcon from '../assets/play-button-arrowhead.png';

export default function Dashboard() {
  const userId = useRequireAuth();
  const navigate = useNavigate();

  const [subject, setSubject]     = useState<Subject | null>(null);
  const [exam, setExam]           = useState<Exam | null>(null);
  const [sessions, setSessions]   = useState<Session[]>([]);
  const [loading, setLoading]     = useState(true);

  // ───────────────────────── LOAD EVERYTHING ─────────────────────────
  useEffect(() => {
    if (!userId) return; // still authenticating
    const uid = userId;

    let cancelled = false;

    async function fetchDashboardData() {
      try {
        // ── 1. Get all exams for this user
        const allExams = await getUserExams(uid);
        console.log(allExams);
        if (cancelled) return;

        // Pick the first exam (if any) and keep it in a local variable
        const firstExam = allExams.length > 0 ? allExams[0] : null;
        if (firstExam) {
          setExam(firstExam);
        }

        // ── 2. Determine which subject to show
        if (firstExam) {
          console.log(firstExam);
          // Use the local firstExam to fetch its subject (not the state)
          const owningSubject = await getSubject(firstExam.subject_id);
          if (!cancelled && owningSubject) {
            setSubject(owningSubject);
          }
        } else {
          // No exams exist: fetch subjects and pick the first one (if any)
          const subs = await getSubjects(uid);
          if (cancelled) return;

          if (subs.length > 0) {
            setSubject(subs[0]);
          }
        }

        // ── 3. Fetch recent sessions, then filter by the local firstExam 
        const allSessions = await getSessions(uid);
        if (cancelled) return;
        setSessions(allSessions);
      } catch (err) {
        console.error(err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    } 

    fetchDashboardData();
    return () => {
      cancelled = true;
    };
  }, [userId]);

  /* ───────────────────────── NAV HELPERS ───────────────────────── */
  const startSession = () => {
    if (!subject || !exam) return;
    const payload = {
      subject_name: subject.subject_name,
      exam_name:    exam.exam_name,
      exam_date:    exam.exam_date,
      subject_id:   subject.subject_id,
      exam_id:      exam.exam_id,
      user_id:      userId,
    }

    console.log('Navigating to /session with payload:', payload);

    navigate('/session', { state: payload });
    
  };

  /* ───────────────────────── RENDER ───────────────────────── */
  if (loading) {
    return (
      <div className="dashboard"><Navbar />
        <div className="content-wrapper">
          <h1 className="heading-1">Welcome back!</h1>
          <Card><p className="body-1">Loading your data…</p></Card>
        </div>
      </div>
    );
  }

  if (!subject) { /* No subjects */
    return (
      <div className="dashboard"><Navbar />
        <div className="content-wrapper">
          <h1 className="heading-1">Welcome back!</h1>
          <Card>
            <p className="heading-2">You don't have any subjects yet</p>
            <button className="button-start" onClick={() => navigate('/add-subject')}>
              + Add a subject
            </button>
          </Card>
        </div>
      </div>
    );
  }

  if (!exam) { /* No exams */
    return (
      <div className="dashboard"><Navbar />
        <div className="content-wrapper">
          <h1 className="heading-1">Welcome back!</h1>
          <Card>
            <p className="heading-2">No exams for {subject.subject_name}</p>
            <button className="button-start" onClick={() => navigate('/subjects')}>
              + Add an exam
            </button>
          </Card>
        </div>
      </div>
    );
  }

  /* MAIN DASHBOARD */
  return (
    <div className="dashboard">
      <Navbar />
      <div className="content-wrapper">
        <h1 className="heading-1">Welcome back!</h1>

        {/* Upcoming session */}
        <Card>
          <p className="heading-2">Ready for your next session?</p>
          <p className="body-1">Subject: {subject.subject_name}</p>
          <p className="body-1">Exam: {exam.exam_name}</p>
          <p className="body-2">
            Exam date: {new Date(exam.exam_date).toLocaleDateString()}
          </p>

          <button className="button-start" onClick={startSession}>
            <img className="icon-play" src={playIcon} alt="▶" />
            <span className="button-text">Start Session</span>
          </button>

          <button className="button-text" style={{ marginTop: 8 }}
                  onClick={() => navigate('/subjects')}>
            Change subject / exam
          </button>
        </Card>

        {/* Recent sessions */}
        {sessions.length > 0 && (
          <Card>
            <h2 className="heading-2">Recent sessions</h2>
            <ul className="body-2" style={{ listStyle: 'none', padding: 0 }}>
              {sessions.slice(0, 5).map((s) => {
                const totalSeconds = s.seconds_spent ?? 0;
                const hours = Math.floor(totalSeconds / 3600);
                const minutes = Math.floor((totalSeconds % 3600) / 60);
                const seconds = totalSeconds % 60;

                // Build a human‐readable string
                let duration = '';
                if (hours > 0) {
                  duration += `${hours}h `;
                }
                if (minutes > 0 || hours > 0) {
                  duration += `${minutes}m `;
                }
                duration += `${seconds}s`;

                return (
                  <li key={s.session_id}>
                    {new Date(s.started_at).toLocaleDateString()} — {duration}
                  </li>
                );
              })}
            </ul>
          </Card>
        )}
      </div>
    </div>
  );
}
