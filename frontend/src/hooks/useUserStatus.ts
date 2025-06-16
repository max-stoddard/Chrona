import { useEffect, useRef, useCallback } from 'react';
import type { UserStatus } from '../types/types';
import { supabase } from '../utils/supabase';

const HEARTBEAT_INTERVAL = 30000; // 30 seconds

export function useUserStatus(isInSession: boolean = false): () => Promise<void> {
  const heartbeatRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const currentStatus = useRef<UserStatus>('OFFLINE');

  const updateStatus = useCallback(async (): Promise<void> => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const newStatus: UserStatus = isInSession ? 'STUDYING' : 'ONLINE';
      
      const { error: upsertError } = await supabase
        .from('user_presence')
        .upsert(
          {
            user_id: user.id,
            user_status: newStatus,
            last_seen: new Date().toISOString()
          },
          {
            onConflict: 'user_id',
            ignoreDuplicates: false
          }
        );

      if (upsertError) {
        console.error('Failed to upsert status:', upsertError);
        return;
      }

      currentStatus.current = newStatus;
    } catch (err) {
      console.error('Error updating presence:', err);
    }
  }, [isInSession]);

  useEffect(() => {
    // Initial status update
    updateStatus();

    // Set up heartbeat interval
    heartbeatRef.current = setInterval(updateStatus, HEARTBEAT_INTERVAL);

    // Update status when tab becomes visible
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        updateStatus();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Cleanup function
    return () => {
      if (heartbeatRef.current) {
        clearInterval(heartbeatRef.current);
      }
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [updateStatus]);

  return updateStatus;
}
