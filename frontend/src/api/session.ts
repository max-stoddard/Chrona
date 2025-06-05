import { type Session } from '../types/types';
import { apiRequest } from '../../utils/apiClient';

/** list the most-recent 5 (or whatever ?limit you send) */
export async function getSessions(userId: string): Promise<Session[]> {
  const apiSessions = await apiRequest<
    {
      session_id     : string;
      user_id        : string;
      subject_id     : string;
      exam_id        : string;
      started_at     : string;
      ended_at?      : string;
      seconds_spent : number;
    }[]
  >('GET', `/api/users/${userId}/sessions?limit=5`);

  return apiSessions.map((s) => ({
    session_id      : s.session_id,
    user_id         : s.user_id,
    subject_id      : s.subject_id,
    exam_id         : s.exam_id,
    started_at      : s.started_at,
    ended_at        : s.ended_at,
    seconds_spent   : s.seconds_spent,
  }));
}

/** returns the new sessionId so the caller can store it in state */
export async function createSession(
  payload: Pick<Session, 'user_id' | 'subject_id' | 'exam_id' | 'started_at'>,
): Promise<string> {
  const res = await apiRequest<{ session_id: string }>('POST', '/api/sessions', {
    user_id    : payload.user_id,
    subject_id : payload.subject_id,
    exam_id    : payload.exam_id,
    started_at : payload.started_at,
  });
  return res.session_id;
}

export async function finishSession(
  session_id: string,
  started_at: string,
  ended_at: string,
): Promise<void> {
  const seconds_spent = Math.max(
    0,
    Math.round(
      (new Date(ended_at).getTime() - new Date(started_at).getTime()) / 1000,
    ),
  );

  await apiRequest<void>('PUT', `/api/sessions/${session_id}`, {
    ended_at      : ended_at,
    seconds_spent : seconds_spent,
  });
}
