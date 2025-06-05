import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  signOut,
  signInWithPassword,
  getUser,
} from '../../utils/authClient';

/**
 * On mount:
 *   • if a valid session exists → return user.id
 *   • otherwise log in with the *service credentials* you used in SubjectsPage.
 *     (Remove these hard-coded creds when real auth arrives.)
 */
export function useRequireAuth() {
  const navigate = useNavigate();
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const init = async () => {
      const { user } = getUser().data;
      if (user) {
        setUserId(user.id);
        return;
      }

      signOut(); // ensure a clean slate
      const { data, error } = await signInWithPassword({
        email   : 'test@test.com',
        password: 'testuser',
      });

      if (data?.user) {
        setUserId(data.user.id);
      } else if (error) {
        console.error(error);
      } else {
        console.warn("Signed in, but got no data.user");
      }
    };
    init();
  }, [navigate]);

  return userId;
}
