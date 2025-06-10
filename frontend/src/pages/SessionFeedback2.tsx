import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Navbar from '../components/Navbar';
import Card from '../components/Card';
import '../styles/feedback2.css';

interface FeedbackState {
  subject_name: string;
  exam_name: string;
}

export default function SessionFeedbackWithEmojis() {
  const { state } = useLocation();
  const nav = useNavigate();

  /* if the user loads /feedback directly, bounce home */
  if (!state) {
    nav('/');
    return null;
  }

  const { subject_name, exam_name } = state as FeedbackState;

  /* emoji ratings */
  const [conf, setConf] = useState<number>(0);
  const [focus, setFocus] = useState<number>(0);

  const Emoji = ({ emoji, selected, onClick }: { emoji: string; selected: boolean; onClick: () => void }) => (
    <span
      className={selected ? 'emoji selected' : 'emoji'}
      onClick={onClick}
      role="button"
    >
      {emoji}
    </span>
  );

  const emojiBar = (value: number, set: (n: number) => void) => (
    <div className="emoji-bar">
      {['😭', '😔', '😐', '😄', '🥳'].map((emoji, index) => (
        <Emoji key={index} emoji={emoji} selected={index + 1 === value} onClick={() => set(index + 1)} />
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
          {emojiBar(conf, setConf)}

          <p className="body-1" style={{ marginTop: 20 }}>How focused were you?</p>
          {emojiBar(focus, setFocus)}

          <button className="button-start" style={{ marginTop: 32 }} onClick={goHome}>
            Submit feedback
          </button>
        </Card>

      </div>
    </div>
  );
}