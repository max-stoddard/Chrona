import React from "react";
import Card from "./Card";
import "../styles/typography.css";
import "../styles/theme.css";

interface SessionCardProps {
  subjectName: string;
  examName: string;
  examDate: Date;
  onStartPause?: () => void;
  onFinish?: () => void;
  running?: boolean;
  seconds?: number;
  editable?: boolean;
  onEdit?: () => void;
}

const formatTime = (total: number) =>
  new Date(total * 1000).toISOString().substring(11, 19);

const SessionCard: React.FC<SessionCardProps> = ({
  subjectName,
  examName,
  examDate,
  onStartPause,
  onFinish,
  running = false,
  seconds = 0,
  editable = false,
  onEdit,
}) => (
  <Card>
    <p className="heading-2">Ready for your next session?</p>
    <p className="body-1">{subjectName}</p>
    <p className="body-1">{examName}</p>
    <p className="body-2">{examDate.toLocaleDateString()}</p>

    {editable && (
      <button className="view-details-button button-text" onClick={onEdit}>
        Edit
      </button>
    )}

    {onStartPause && (
      <button className="button-start" onClick={onStartPause} style={{ marginTop: 20 }}>
        <span className="button-text">{running ? "Pause" : "Start"} Session</span>
      </button>
    )}
    {onFinish && (
      <button className="button-start" onClick={onFinish} style={{ marginTop: 10 }}>
        <span className="button-text">Finish Session</span>
      </button>
    )}

    {onStartPause && (
      <p className="heading-2" style={{ marginTop: 20 }}>{formatTime(seconds)}</p>
    )}
  </Card>
);

export default SessionCard;