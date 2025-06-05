import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import SessionCard from '../components/SessionCard';

import { createSession, finishSession } from '../api/session';
import { useEffect, useState } from 'react';
import { useRequireAuth } from '../hooks/useRequireAuth';

interface State {
  subject_name: string;
  exam_name: string;
  exam_date: string;
  subject_id: string;
  exam_id: string;
  user_id: string;
}

export default function SessionPage() {
  const { state } = useLocation();
  const navigate  = useNavigate();
  const userId = useRequireAuth()

  const [sessionId, setSessionId] = useState<string>();
  const [startTime, setStartTime] = useState<string>();

  /* If user refreshes / loads directly, bail out */
  if (!state) {
    navigate('/', { replace: true });
    return null;
  }

  const {
    subject_name,
    exam_name,
    exam_date,
    subject_id,
    exam_id,
    user_id,
  } = state as State;

  /* Create session exactly once */
  useEffect(() => {
    const started_at = new Date().toISOString();          // exact timestamp
    setStartTime(started_at);

    createSession({
      user_id,
      subject_id,
      exam_id,
      started_at,
    })
      .then(setSessionId)
      .catch((err) => {
        console.error(err);
        navigate('/', { replace: true });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // run once on mount

  /* Handle finish click */
  const handleFinish = async () => {
    if (sessionId && startTime) {
      try {
        await finishSession(sessionId, startTime, new Date().toISOString());
      } catch (err) {
        console.error(err);
      }
    }
    navigate('/');
  };

  return (
    <div className="dashboard">
      <Navbar />
      <div className="content-wrapper">
        <SessionCard
          subject={subject_name}
          exam={exam_name}
          examDate={exam_date}
          onFinish={handleFinish}
        />
      </div>
    </div>
  );
}
