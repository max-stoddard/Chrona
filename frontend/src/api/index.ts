export const API_BASE = "/api";

async function fetchJson<T = any>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url, init);
  if (!res.ok) throw new Error(res.statusText);
  // @ts-ignore – Supabase may reply 204 w/ no body
  return res.status === 204 ? (undefined as T) : res.json();
}

export async function getFirstSubjectAndExam(userId: string) {
  const subjects: { subject_id: string; subject_name: string }[] =
    await fetchJson(`${API_BASE}/users/${userId}/subjects`);
  if (subjects.length === 0) return null;

  const subject = subjects[0];
  const exams: { exam_id: string; exam_name: string; exam_date: string }[] =
    await fetchJson(`${API_BASE}/subjects/${subject.subject_id}/exams`);
  if (exams.length === 0) return null;

  return { subject, exam: exams[0] };
}

// Helper to start / finish a session
export async function startSession(payload: {
  userId: string;
  subjectId: string;
  examId: string;
  startedAt: string; // ISO
}) {
  return fetchJson<{ sessionId: string }>(`${API_BASE}/sessions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}

export async function finishSession(sessionId: string, secondsSpent: number) {
  return fetchJson<void>(`${API_BASE}/sessions/${sessionId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ secondsSpent, endedAt: new Date().toISOString() }),
  });
}