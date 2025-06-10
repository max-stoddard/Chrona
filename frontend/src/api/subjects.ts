import { type Subject } from '../types/types';
import { apiRequest } from '../../utils/apiClient';

export async function getSubjects(userId: string): Promise<Subject[]> {
  const apiSubjects = await apiRequest<
    { subject_id: string; user_id: string; subject_name: string; subject_seconds_spent: number }[]
  >('GET', `/api/users/${userId}/subjects`);

  // JSON → domain model
  return apiSubjects.map((s) => ({
    subject_id  : s.subject_id,
    user_id     : s.user_id,
    subject_name: s.subject_name,
  }));
}

export async function getSubject(subjectId: string): Promise<Subject | null> {
  const apiSubject = await apiRequest<
    { subject_id: string; user_id: string; subject_name: string; subject_seconds_spent: number } | null
  >('GET', `/api/subject/${subjectId}`);

  if (!apiSubject) {
    return null;
  }

  return {
    subject_id  : apiSubject.subject_id,
    user_id     : apiSubject.user_id,
    subject_name: apiSubject.subject_name,
  };
}

export async function createSubject(
  user_id: string,
  subject_name: string,
): Promise<string> {
  const { subject_id } = await apiRequest<{ subject_id: string }>(
    'POST',
    `/api/users/${user_id}/subjects`,
    { name: subject_name }, // Backend expects 'name', not 'subject_name'
  );
  return subject_id;
}

export async function deleteSubject(subject_id: string): Promise<void> {
  await apiRequest<void>('DELETE', `/api/users/*/subjects/${subject_id}`);
}