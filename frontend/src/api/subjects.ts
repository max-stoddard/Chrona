import { type Subject } from '../types/types';
import { apiRequest } from '../../utils/apiClient';

export async function getSubjects(userId: string): Promise<Subject[]> {
  const apiSubjects = await apiRequest<
    { subject_id: string; user_id: string; subject_name: string }[]
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
    { subject_id: string; user_id: string; subject_name: string } | null
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
  const { subjectId } = await apiRequest<{ subjectId: string }>(
    'POST',
    `/api/users/${user_id}/subjects`,
    { subject_name },
  );
  return subjectId;
}

export async function deleteSubject(subject_id: string): Promise<void> {
  await apiRequest<void>('DELETE', `/api/users/*/subjects/${subject_id}`);
}
