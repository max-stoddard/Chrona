import { useEffect } from 'react';
import { supabase } from '../utils/supabase';
import { useUserStatus } from './useUserStatus';

export function useGlobalPresence() {
  const updateStatus = useUserStatus(false);

  useEffect(() => {
    // Initial status update
    updateStatus();

    // Set up auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event) => {
      if (event === 'SIGNED_IN') {
        updateStatus();
      } else if (event === 'SIGNED_OUT') {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          // Set status to offline when signing out
          await supabase
            .from('user_presence')
            .update({
              user_status: 'OFFLINE',
              last_seen: new Date().toISOString()
            })
            .eq('user_id', user.id);
        }
      }
    });

    // Set up visibility change handler
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        updateStatus();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Cleanup
    return () => {
      subscription.unsubscribe();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [updateStatus]);
}
