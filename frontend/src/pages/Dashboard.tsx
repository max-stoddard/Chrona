import '../styles/dashboard.css';
import '../styles/typography.css';
import '../styles/theme.css';

import Navbar from '../components/Navbar';
import Card from '../components/Card';

import { getSessions } from '../api/session';
import { getRecommendedSubject } from '../api/subjects';
import { getUserExams, getUpcomingExams, getRecommendedExam } from '../api/exams';
import { useEffect, useState } from 'react';
import { type Subject, type Exam, type Session } from '../types/types';
import { useNavigate } from 'react-router-dom';
import { useRequireAuth } from '../hooks/useRequireAuth';
import { supabase } from '../utils/supabase';

import playIcon from '../assets/play-button-arrowhead.png';

export default function Dashboard() {
  const userId = useRequireAuth();
  const navigate = useNavigate();
  const [userName, setUserName] = useState<string>('User');

  const [subject, setSubject]               = useState<Subject | null>(null);
  const [exam, setExam]                     = useState<Exam | null>(null);
  const [sessions, setSessions]             = useState<Session[]>([]);
  const [loading, setLoading]               = useState(true);
  const [upcoming, setUpcoming]             = useState<Exam[]>([]);
  const [completedExams, setCompletedExams] = useState(-1); // -1 means no progress bar
  const [totalExams, setTotalExams]         = useState(0);

  // ───────────────────────── LOAD EVERYTHING ─────────────────────────
  useEffect(() => {
    if (!userId) return; // still authenticating
    const uid = userId;

    let cancelled = false;

    async function fetchDashboardData() {
      try {
        const allExams = await getUserExams(uid);

        // Calculate progress percentage based on completed exams
        if (allExams.length > 0) {
          const currentDate = new Date();
          const completedExams = allExams.filter(exam => new Date(exam.exam_date) < currentDate);
          setCompletedExams(completedExams.length);
          setTotalExams(allExams.length);
        }

        // ── 1. Get recommended subject
        const recommendedSubject = await getRecommendedSubject(uid);
        if (cancelled) return;

        if (!recommendedSubject) {
          // No recommended subject, don't set anything and let the UI handle it
          setLoading(false);
          return;
        }

        // We have a recommended subject, set it
        setSubject(recommendedSubject);

        // ── 2. Get recommended exam for this subject
        const recommendedExam = await getRecommendedExam(recommendedSubject.subject_id, uid);
        if (cancelled) return;

        if (!recommendedExam) {
          // No recommended exam, don't set exam and let the UI handle it
          setLoading(false);
          return;
        }

        // We have both recommended subject and exam, set the exam
        setExam(recommendedExam);

        // ── 3. Fetch recent sessions and upcoming exams
        const [allSessions, soonest] = await Promise.all([
          getSessions(uid),
          getUpcomingExams(uid)
        ]);
        if (cancelled) return;
        
        setSessions(allSessions);
        setUpcoming(soonest);
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

  useEffect(() => {
    const fetchUserEmail = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user?.email) {
        // Get the part before the @ symbol
        const emailName = user.email.split('@')[0];
        // Capitalize the first letter
        setUserName(emailName.charAt(0).toUpperCase() + emailName.slice(1));
      }
    };
    fetchUserEmail();
  }, []);

  /* ───────────────────────── NAV HELPERS ───────────────────────── */
  const startSession = () => {
    if (!subject || !exam) return;
    const payload = {
      subject_name: subject.subject_name,
      exam_name:    exam.exam_name,
      exam_date:    exam.exam_date,
      subject_id:   subject.subject_id,
      exam_id:      exam.exam_id,
    }

    console.log('Navigating to /session with payload:', payload);

    navigate('/session', { state: payload });
    
  };

  /* ───────────────────────── RENDER ───────────────────────── */
  if (loading) {
    return (
      <div className="dashboard"><Navbar />
        <div className="content-wrapper">
          <h1 className="heading-1">Welcome back, {userName}!</h1>
          <Card><p className="body-1">Loading your data…</p></Card>
        </div>
      </div>
    );
  }

  if (!subject) { /* No subjects */
    return (
      <div className="dashboard"><Navbar />
        <div className="content-wrapper">
          <h1 className="heading-1">Welcome back, {userName}!</h1>
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
          <h1 className="heading-1">Welcome back, {userName}!</h1>
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
        <h1 className="heading-1">Welcome back, {userName}!</h1>

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

          <button className="button-secondary" style={{ marginTop: 8 }}
                  onClick={() => navigate('/subjects')}>
            Change subject / exam
          </button>
        </Card>

        {/* Progress Card */}
        <Card>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
            <h2 className="heading-2" style={{ margin: 0 }}>Exams Completed</h2>
            <span className="body-1" style={{ whiteSpace: 'nowrap' }}>
              ({completedExams} / {totalExams})
            </span>
          </div>
          <div style={{ 
            width: '100%',
            height: '24px', 
            backgroundColor: '#eee',
            borderRadius: '12px',
            overflow: 'hidden',
            position: 'relative'
          }}>
            <div style={{
              position: 'absolute',
              left: 0,
              top: 0,
              width: `${(completedExams / totalExams) * 100}%`,
              height: '100%',
              backgroundColor: '#000000',
              transition: 'width 0.3s ease'
            }} />
          </div>
        </Card>

        {/* Recent sessions */}
        <div className="card-row">
            {sessions.length > 0 && (
            <Card>
                <h2 className="heading-2">Your recent sessions</h2>
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

            {upcoming.length > 0 && (
            <Card>
                <h2 className="heading-2">Upcoming exams</h2>
                <ul className="body-2" style={{ listStyle: 'none', padding: 0 }}>
                {upcoming.map((e) => (
                    <li key={e.exam_id} style={{ marginBottom: 6 }}>
                    {new Date(e.exam_date).toLocaleDateString()}
                    {' — '}
                    <strong>{e.exam_name}</strong>
                    {' ('}{e.subject_name ?? '—'}{')'}
                    </li>
                ))}
                </ul>
            </Card>
            )}
        </div>

      </div>
    </div>
  );
}