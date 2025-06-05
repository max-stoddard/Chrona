import { type Exam } from '../types/types';
import { apiRequest } from '../../utils/apiClient';



export async function getExams(subjectId: string): Promise<Exam[]> {
  const apiExams = await apiRequest<
    { 
      exam_id: string;
      subject_id: string;
      exam_name: string;
      exam_date: string;
      exam_difficulty: number 
    }[]
  >('GET', `/api/subjects/${subjectId}/exams`);

  return apiExams.map((e) => ({
    exam_id     : e.exam_id,
    subject_id  : e.subject_id,
    exam_name   : e.exam_name,
    exam_date   : e.exam_date,
    exam_difficulty : e.exam_difficulty,
  }));
}

export async function getUserExams(userId: string): Promise<Exam[]> {
  const apiExams = await apiRequest<
    {
      exam_id: string;
      subject_id: string;
      exam_name: string;
      exam_date: string;
      exam_difficulty: number;
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
  subjectId: string,
  payload: Omit<Exam, 'examId' | 'subjectId'>,
): Promise<string> {
  const { examId } = await apiRequest<{ examId: string }>(
    'POST',
    `/api/subjects/${subjectId}/exams`,
    {
      name      : payload.exam_name,
      date      : payload.exam_date,
      difficulty: payload.exam_difficulty,
    },
  );
  return examId;
}

export async function updateExam(
  subjectId: string,
  examId: string,
  payload: Partial<Omit<Exam, 'examId' | 'subjectId'>>,
): Promise<void> {
  await apiRequest<void>(
    'PUT',
    `/api/subjects/${subjectId}/exams/${examId}`,
    {
      ...(payload.exam_name   && { name : payload.exam_name }),
      ...(payload.exam_date   && { date : payload.exam_date }),
      ...(payload.exam_difficulty !== undefined && { difficulty: payload.exam_difficulty }),
    },
  );
}

export async function deleteExam(
  subjectId: string,
  examId: string,
): Promise<void> {
  await apiRequest<void>('DELETE', `/api/subjects/${subjectId}/exams/${examId}`);
}
