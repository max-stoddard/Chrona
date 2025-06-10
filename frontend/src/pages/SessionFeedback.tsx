import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Navbar  from '../components/Navbar';
import Card    from '../components/Card';
import '../styles/feedback.css';

interface FeedbackState {
  subject_name: string;
  exam_name   : string;
}

export default function SessionFeedback() {
  const { state } = useLocation();
  const nav       = useNavigate();

  /* if the user loads /feedback directly, bounce home */
  if (!state) { nav('/'); return null; }

  const { subject_name, exam_name } = state as FeedbackState;

  /* star ratings */
  const [conf,  setConf]  = useState<number>(0);
  const [focus, setFocus] = useState<number>(0);

  const Star = ({ filled, onClick }: { filled: boolean; onClick: () => void }) => (
    <span
      className={filled ? 'star selected' : 'star'}
      onClick={onClick}
      role="button"
    >
      ★
    </span>
  );

  const starBar = (value: number, set: (n: number) => void) => (
    <div>
      {[1,2,3,4,5].map(n => (
        <Star key={n} filled={n <= value} onClick={() => set(n)} />
      ))}
    </div>
  );

  const goHome = () => nav('/');

  return (
    <div className="dashboard">
      <Navbar />
      <div className="content-wrapper">

      <Card className="feedback-card">

          <div className="card-header">
            <h2 className="heading-2">{subject_name}</h2>
            <button className="close-btn" onClick={goHome}>✕</button>
          </div>

          <p className="body-1">{exam_name}</p>
          <hr style={{ margin: '16px 0' }} />

          <p className="body-1">How confident are you now?</p>
          {starBar(conf, setConf)}

          <p className="body-1" style={{ marginTop: 20 }}>How focused were you?</p>
          {starBar(focus, setFocus)}

          <button className="button-start" style={{ marginTop: 32 }} onClick={goHome}>
            Submit feedback
          </button>
        </Card>

      </div>
    </div>
  );
}
