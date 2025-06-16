export interface Subject {
  subject_id: string;
  user_id: string;
  subject_name: string;
  subject_seconds_spent?: number;
}

export interface Exam {
  exam_id: string;
  subject_id: string;
  exam_name: string;
  exam_date: string; // ISO yyyy-mm-dd
  exam_difficulty: number;
  subject_name?: string;
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

export type UserStatus = 'OFFLINE' | 'ONLINE' | 'STUDYING';

export interface LeaderboardUser {
  email: string;
  totalSeconds: number;
  status: UserStatus;
  lastSeen: string;
}