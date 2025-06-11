import { type Exam } from '../types/types';
import { apiRequest } from '../../utils/apiClient';
import { getSubjects } from './subjects';

export async function getExams(userId: string, subjectId: string): Promise<Exam[]> {
  const apiExams = await apiRequest<
    { 
      exam_id: string;
      subject_id: string;
      user_id: string;
      exam_name: string;
      exam_date: string;
      exam_difficulty: number;
      exam_confidence: number;
      exam_seconds_spent: number;
    }[]
  >('GET', `/api/users/${userId}/subjects/${subjectId}/exams`); // Fixed to use actual userId

  return apiExams.map((e) => ({
    exam_id     : e.exam_id,
    subject_id  : e.subject_id,
    exam_name   : e.exam_name,
    exam_date   : e.exam_date,
    exam_difficulty : e.exam_difficulty,
  }));
}

export async function getRecommendedExam(
  subjectId: string,
  userId: string,
): Promise<Exam | null> {
  const apiExam = await apiRequest<
    { 
      exam_id: string;
      subject_id: string;
      exam_name: string;
      exam_date: string;
      exam_difficulty: number 
    }[]
  >('GET', `/api/users/${userId}/subjects/${subjectId}/recommendation`);

  if (!apiExam || apiExam.length == 0) return null;

  const first = apiExam[0];
  return {
    exam_id:       first.exam_id,
    subject_id:    first.subject_id,           
    exam_name:     first.exam_name,
    exam_date:     first.exam_date,
    exam_difficulty:first.exam_difficulty,
  };
}

export async function getUserExams(userId: string): Promise<Exam[]> {
  const apiExams = await apiRequest<
    {
      exam_id: string;
      subject_id: string;
      user_id: string;
      exam_name: string;
      exam_date: string;
      exam_difficulty: number;
      exam_confidence: number;
      exam_seconds_spent: number;
    }[]
  >('GET', `/api/users/${userId}/exams`);

  return apiExams.map((e) => ({
    exam_id        : e.exam_id,
    subject_id     : e.subject_id,
    exam_name      : e.exam_name,
    exam_date      : e.exam_date,
    exam_difficulty: e.exam_difficulty,
  }));
}

export async function createExam(
  userId: string,
  subjectId: string,
  payload: Omit<Exam, 'exam_id' | 'subject_id'>,
): Promise<string> {
  const examId = await apiRequest<string>(
    'POST',
    `/api/users/${userId}/subjects/${subjectId}/exams`,
    {
      name      : payload.exam_name,
      date      : payload.exam_date,
      difficulty: payload.exam_difficulty,
    },
  );
  return examId;
}

export async function updateExam(
  userId: string,
  subjectId: string,
  examId: string,
  payload: Partial<Omit<Exam, 'exam_id' | 'subject_id'>>,
): Promise<void> {
  await apiRequest<void>(
    'PUT',
    `/api/users/${userId}/subjects/${subjectId}/exams/${examId}`,
    {
      ...(payload.exam_name && { name : payload.exam_name }),
      ...(payload.exam_date && { date : payload.exam_date }),
      ...(payload.exam_difficulty !== undefined && { difficulty: payload.exam_difficulty }),
    },
  );
}

export async function deleteExam(
  userId: string,
  subjectId: string,
  examId: string,
): Promise<void> {
  await apiRequest<void>('DELETE', `/api/users/${userId}/subjects/${subjectId}/exams/${examId}`);
}

export async function getUpcomingExams(userId: string, count = 5) {
    const [exams, subjects] = await Promise.all([
      getUserExams(userId),
      getSubjects(userId),
    ]);
  
    const nameById = Object.fromEntries(
      subjects.map(s => [s.subject_id, s.subject_name])
    );
  
    const today = new Date().toISOString().slice(0, 10);
  
    return exams
      .filter(e => e.exam_date >= today)
      .sort((a, b) => a.exam_date.localeCompare(b.exam_date))
      .slice(0, count)
      .map(e => ({ ...e, subject_name: nameById[e.subject_id] ?? '—'}));
}