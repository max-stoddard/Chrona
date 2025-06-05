import { getAuthToken } from './authClient';

export async function apiRequest<T = unknown>(
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  endpoint: string,
  body?: unknown,
): Promise<T> {
  const token = getAuthToken() ?? '';
  const url   = `${import.meta.env.VITE_API_BASE_URL}${endpoint}`;

  const opts: RequestInit = {
    method,
    headers: {
      'Content-Type' : 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  };

  try {
    const res  = await fetch(url, opts);
    const text = await (res.status !== 204 ? res.text() : '');
    if (!res.ok) {
      console.error(`[API Fail] ${method} ${endpoint} - ${res.status}: ${text}`);
      throw new Error(text || res.statusText);
    }

    if (res.status === 204) {
      console.log(`[API Success] ${method} ${endpoint} - 204 No Content`);
      // @ts-expect-error  intentionally returning void when T is void
      return;
    }

    const json: T = JSON.parse(text);
    console.log(`[API Success] ${method} ${endpoint}`, json);
    return json;
  } catch (err) {
    console.error(`[API Error] ${method} ${endpoint}`, err);
    throw err;
  }
}
