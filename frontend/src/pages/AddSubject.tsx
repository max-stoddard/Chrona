import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import supabase from '../../utils/supabase';
import plusIcon from '../assets/plusSign.png';
import '../styles/addsubject.css';

interface Exam {
  name: string;
  date: string;        // ISO YYYY-MM-DD from `<input type="date">`
  difficulty: '' | 'Easy' | 'Medium' | 'Hard';
  confidence?: '' | 'Not confident' | 'Somewhat confident' | 'Very confident';
}

export default function AddSubjectPage() {
  const [subjectName, setSubjectName] = useState('');
  const [exams, setExams] = useState<Exam[]>([]);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  const subjectId = crypto.randomUUID();

  /** helper – add an empty exam row                           */
  const addExam = () =>
    setExams((prev) => [
      ...prev,
      { name: '', date: '', difficulty: '', confidence: ''},
    ]);

  /** helper – update a single exam                            */
  const updateExam = (idx: number, patch: Partial<Exam>) =>
    setExams((prev) =>
      prev.map((e, i) => (i === idx ? { ...e, ...patch } : e)),
    );

  /** POST subject + exams to the Spring Boot API              */
  const saveSubject = async () => {
    if (!subjectName.trim()) return alert('Please enter a subject name.');

    setSaving(true);
    try {
      // get (already-cached) service user
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();
      if (error || !user) throw error ?? new Error('No user session');

      const userID = user.id;
      // build payload
      const payload = { subject_id:subjectId, user_id:userID,
       name:subjectName.trim() };

      

      const api = import.meta.env.VITE_API_BASE_URL as string;
      const res = await fetch(
        `${api}/api/users/${user.id}/subjects`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        },
      );
      if (!res.ok) throw new Error(await res.text());

      // success → back to /subjects
      navigate('/subjects');
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Failed to save subject', err);
      alert('Sorry, that did not work – see console for details.');
    } finally {
      setSaving(false);
    }
  };

  /* Add one empty exam row automatically so the UI isn’t blank */
  useEffect(() => {
    if (exams.length === 0) addExam();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="add-subject-page">
      <Navbar />

      <main className="container">
        {/* Page heading */}
        <h1 className="heading-1 text-center">Add Subject</h1>

        {/* Subject name */}
        <div className="form-group">
          <label htmlFor="subjectName" className="body-1">
            Subject Name
          </label>
          <input
            id="subjectName"
            className="subject-input body-2"
            placeholder="e.g. History"
            value={subjectName}
            onChange={(e) => setSubjectName(e.target.value)}
          />
        </div>

        {/* Exams section */}
        <h2 className="heading-2 text-left exams-label">Exams</h2>

        {exams.map((exam, idx) => (
          <div key={idx} className="exam-row">
            <input
              className="exam-title body-2"
              placeholder="Paper title"
              value={exam.name}
              onChange={(e) => updateExam(idx, { name: e.target.value })}
            />

            <input
              type="date"
              className="exam-date body-2"
              value={exam.date}
              onChange={(e) => updateExam(idx, { date: e.target.value })}
            />

            <select
              className="exam-difficulty body-2"
              value={exam.difficulty}
              onChange={(e) =>
                updateExam(idx, {
                  difficulty: e.target.value as Exam["difficulty"],
                })
              }
            >
              <option value="" disabled>
                Exam difficulty
              </option>
              <option>Easy</option>
              <option>Medium</option>
              <option>Hard</option>
            </select>

            <select
                className="exam-confidence body-2"
                value={exam.confidence}
                onChange={(e) =>
                    updateExam(idx, {
                    confidence: e.target.value as Exam['confidence'],
                    })
                }
                >
                <option value="" disabled>
                  Confidence level
                </option>
                <option>Not confident</option>
                <option>Somewhat confident</option>
                <option>Very confident</option>
              </select>

          </div>
        ))}

        {/* Add Exam */}
        <button type="button" className="add-exam-btn" onClick={addExam}>
          <img src={plusIcon} alt="Add" className="icon-plus" />
          <span className="button-text">Add Exam</span>
        </button>

        {/* Save Subject */}
        <button
          type="button"
          className="save-btn"
          disabled={saving}
          onClick={saveSubject}
        >
          <span className="button-text">{saving ? "Saving…" : "Save Subject"}</span>
        </button>
      </main>
    </div>
  );
}