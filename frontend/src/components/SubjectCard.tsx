import Card from './Card';
import '../styles/typography.css';
import '../styles/theme.css';
import '../styles/subjectcard.css';
import type { Exam } from '../types/types';

interface SubjectCardProps {
  name: string;
  exams: Exam[];
  onView?: () => void;
  onDelete: () => void;
}

export default function SubjectCard({
  name,
  exams,
  onView,
  onDelete,
}: SubjectCardProps) {
  return (
    <Card>
      <div className="subject-card">
        {/* delete “×” in the top-right corner (CSS already positions it) */}
        <button className="delete-btn" onClick={onDelete}>
          ×
        </button>

        {/* ▼ title uses .subject-title, which your CSS knows about */}
        <h3 className="heading-2 subject-title">{name}</h3>

        {/* ▼ each exam on its own .exams-line */}
        {exams.length === 0 ? (
          <p className="exams-line body-2">No exams added</p>
        ) : (
          exams.map((e) => (
            <p key={e.exam_id} className="exams-line body-2">
              {e.exam_name}{''}
              <span className="exam-date">
              - {new Date(e.exam_date).toLocaleDateString('en-GB', {
                  day: '2-digit',
                  month: '2-digit',
                  year: '2-digit'
                })}
              </span>
            </p>
          ))
        )}

        {/* View-information button stays at the bottom via margin-top:auto */}
        <button className="view-details-button button-text" onClick={onView}>
          View Details
        </button>
      </div>
    </Card>
  );
}