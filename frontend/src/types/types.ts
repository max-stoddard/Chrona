export interface Subject {
  subject_id: string;
  user_id: string;
  subject_name: string;
}

export interface Exam {
  exam_id: string;
  subject_id: string;
  exam_name: string;
  exam_date: string; // ISO yyyy-mm-dd
  exam_difficulty: number;
}

export interface Session {
  session_id: string;
  user_id: string;
  subject_id: string;
  exam_id: string;
  started_at: string;
  ended_at?: string;
  seconds_spent: number;
}