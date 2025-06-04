import React from 'react';
import Card from './Card';
import '../styles/typography.css';
import '../styles/theme.css';
import '../styles/subjectcard.css';

interface SubjectCardProps {
  name: string;
  onView?: () => void;
  onDelete: () => void;
}

/**
 * Renders a single subject as a Card.
 * "Exams:" section intentionally left blank for now.
 */
const SubjectCard: React.FC<SubjectCardProps> = ({ name, onView, onDelete }) => (
  <Card className="subject-card">
    {/* Subject Name */}
    <h2 className="heading-2 subject-title">{name}</h2>
    {/* delete button */}
    <button className="delete-btn" onClick={onDelete} title="Delete">
        ×
    </button>
    {/* Brief Exams */}
    <p className="body-2 exams-line">Exams:&nbsp;</p>
    
    {/* View Details */}
    <button className="view-details-button button-text" onClick={onView}>
      View Details
    </button>
  </Card>
);

export default SubjectCard;