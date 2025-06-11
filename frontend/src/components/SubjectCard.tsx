import Card from './Card';
import '../styles/typography.css';
import '../styles/theme.css';
import '../styles/subjectcard.css';
import type { Exam } from '../types/types';

interface SubjectCardProps {
  name: string;
  exams: Exam[];
  timeSpentSeconds?: number;      // ← NEW
  onView?: () => void;
  onDelete: () => void;
}

/** simple “2 h 13 m” converter */
const prettyDuration = (seconds?: number) => {
  if (!seconds) return '—';
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  return `${h ? `${h} h ` : ''}${m ? `${m} m` : ''}`.trim();
};

export default function SubjectCard({
  name,
  exams,
  timeSpentSeconds,
  onView,
  onDelete,
}: SubjectCardProps) {
  return (
    <Card>
      <div className="subject-card">
        <button className="delete-btn" onClick={onDelete}>x</button>

        <h3 className="heading-2 subject-title">{name}</h3>

        {/* time-spent line */}
        <p className="time-line body-2">
          Time spent:&nbsp;
          <strong>{prettyDuration(timeSpentSeconds)}</strong>
        </p>

        {/* exams */}
        {exams.length === 0 ? (
          <p className="exams-line body-2">No exams added</p>
        ) : (
          exams.map((e) => (
            <p key={e.exam_id} className="exams-line body-2">
              {e.exam_name}
              <span className="exam-date">
                &nbsp;–&nbsp;
                {new Date(e.exam_date).toLocaleDateString('en-GB', {
                  day: '2-digit',
                  month: '2-digit',
                  year: '2-digit',
                })}
              </span>
            </p>
          ))
        )}

        <button className="view-details-button button-text" onClick={onView}>
          View Details
        </button>
      </div>
    </Card>
  );
}
