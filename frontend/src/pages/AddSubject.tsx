import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import supabase from '../../utils/supabase';
import vector0 from '../assets/plusSign.png';
import '../styles/addsubject.css';

interface Exam {
  name: string;
  date: string;        // ISO YYYY-MM-DD from `<input type="date">`
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

export default function AddSubjectPage() {
  const [subjectName, setSubjectName] = useState('');
  const [exams, setExams] = useState<Exam[]>([]);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  /** helper – add an empty exam row                           */
  const addExam = () =>
    setExams((prev) => [
      ...prev,
      { name: '', date: '', difficulty: 'Medium' as const },
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

      // build payload
      const payload = { subjectName, exams };

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

      <div className="depth-frame-9">
        <div className="depth-frame-10">
          {/* Heading */}
          <div className="depth-frame-11">
            <div className="depth-frame-12">
              <h1 className="text-wrapper-3">Add Subject</h1>
            </div>
          </div>

          {/* Subject name */}
          <div className="depth-frame-13">
            <div className="depth-frame-14">
              <label className="depth-frame-15">
                <span className="text-wrapper-4">Subject Name</span>
              </label>
              <input
                className="e-g-history-wrapper"
                placeholder="e.g. History"
                value={subjectName}
                onChange={(e) => setSubjectName(e.target.value)}
              />
            </div>
          </div>

          {/* Exams label */}
          <div className="depth-frame-16">
            <h2 className="text-wrapper-5">Exams</h2>
          </div>

          {/* Exam rows */}
          {exams.map((exam, idx) => (
            <div key={idx} className="depth-frame-17">
              <div className="overlap-wrapper">
                <div className="overlap">
                  <div className="overlap-group">
                    <div className="depth-frame-18">
                      <input
                        className="text-wrapper-4"
                        placeholder="Paper title"
                        value={exam.name}
                        onChange={(e) =>
                          updateExam(idx, { name: e.target.value })
                        }
                      />
                    </div>

                    <input
                      type="date"
                      className="text-wrapper-6"
                      value={exam.date}
                      onChange={(e) =>
                        updateExam(idx, { date: e.target.value })
                      }
                    />
                  </div>

                  {/* difficulty selector */}
                  <div className="depth-frame-19">
                    <select
                      className="text-wrapper-7"
                      value={exam.difficulty}
                      onChange={(e) =>
                        updateExam(idx, {
                          difficulty: e.target.value as Exam['difficulty'],
                        })
                      }
                    >
                      <option>Easy</option>
                      <option>Medium</option>
                      <option>Hard</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Add Exam button */}
          <div className="depth-frame-21" onClick={addExam}>
            <div className="depth-frame-22 cursor-pointer">
              <div className="depth-frame-23">
                <div className="vector-wrapper">
                  <img className="vector" alt="Add exam" src={vector0} />
                </div>
              </div>
              <div className="depth-frame-23">
                <span className="text-wrapper-9">Add Exam</span>
              </div>
            </div>
          </div>

          {/* Save Subject button */}
          <div className="depth-frame-21">
            <button
              disabled={saving}
              className="depth-frame-24 cursor-pointer"
              onClick={saveSubject}
            >
              <div className="depth-frame-23">
                <span className="text-wrapper-10">
                  {saving ? 'Saving…' : 'Save Subject'}
                </span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
