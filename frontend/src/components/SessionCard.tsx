import React from 'react';
import Card from './Card';
import useStopwatch from '../hooks/useStopwatch';
import '../styles/sessioncard.css';
import playIcon from '../assets/play-button-arrowhead.png';
import pauseIcon from '../assets/pause.png';
import finishIcon from '../assets/stop-button.png';

interface Props {
  subject: string;
  exam: string;
  examDate: string;
  onFinish: () => void;
  editable?: boolean;
  onEdit?: () => void;
}

const SessionCard: React.FC<Props> = ({ subject, exam, examDate, onFinish, editable, onEdit }) => {
  const { formatted, running, start, pause } = useStopwatch(true);

  return (
    <Card className="session-card">
      <h2 className="heading-2">{subject}</h2>
      <p className="body-1">{exam}</p>
      <p className="body-2">{new Date(examDate).toLocaleDateString()}</p>

      {/* Stopwatch */}
      <p className="stopwatch">{formatted}</p>

      {/* Controls */}
      <div className="controls">
        {running ? (
          <button className="icon-btn" onClick={pause}>
            <img src={pauseIcon} alt="Pause" />
          </button>
        ) : (
          <button className="icon-btn" onClick={start}>
            <img src={playIcon} alt="Start" />
          </button>
        )}

        <button className="icon-btn finish" onClick={onFinish}>
          <img src={finishIcon} alt="Finish" />
        </button>
      </div>

      {editable && (
        <button className="edit-link button-text" onClick={onEdit}>
          Change subject / exam
        </button>
      )}
    </Card>
  );
};

export default SessionCard;