import { useEffect, useState, useCallback } from 'react';
import Navbar from '../components/Navbar';
import Card from '../components/Card';
import { supabase } from '../utils/supabase';
import type { LeaderboardUser, UserStatus } from '../types/types';
import '../styles/typography.css';
import '../styles/theme.css';
import '../styles/status.css';

export default function Leaderboard() {
  const [users, setUsers] = useState<LeaderboardUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user?.email) {
        setCurrentUser(user.email);
      }

      const [leaderboardRes, presenceResult] = await Promise.all([
        fetch(`${import.meta.env.VITE_API_BASE_URL as string}/api/leaderboard`),
        supabase.rpc('get_leaderboard_with_status')
      ]);

      if (!leaderboardRes.ok) {
        throw new Error(await leaderboardRes.text());
      }

      const leaderboardData = await leaderboardRes.json();
      
      if (presenceResult.error) {
        console.error('Failed to fetch presence data:', presenceResult.error);
      }
      
      const mergedData = leaderboardData.map((user: { email: string; totalSeconds: number; }) => {
        const presence = presenceResult.data?.find((p: { email: string; status: string; last_seen: string }) => 
          p.email.toLowerCase() === user.email.toLowerCase()
        );
        return {
          ...user,
          status: (presence?.status as UserStatus) || 'OFFLINE',
          lastSeen: presence?.last_seen || new Date().toISOString()
        };
      });

      setUsers(mergedData);
      setError(null);
    } catch (err) {
      console.error('Failed to load leaderboard', err);
      setError('Failed to load leaderboard data');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // Set up presence channel
    const presenceChannel = supabase.channel('online-users');
    
    presenceChannel
      .on('presence', { event: 'sync' }, () => {
        fetchData();
      })
      .subscribe();

    // Initial fetch
    fetchData();

    // Set up polling every 1 second
    const pollInterval = setInterval(fetchData, 1000);

    // Cleanup function
    return () => {
      presenceChannel.unsubscribe();
      clearInterval(pollInterval);
    };
  }, [fetchData]);

  const getStatusClass = (status: UserStatus) => {
    return `status-indicator status-${status.toLowerCase()}`;
  };

  if (loading) return (
    <div className="dashboard">
      <Navbar />
      <div className="content-wrapper">
        <h1 className="heading-1">Leaderboard</h1>
        <Card>
          <div>Loading...</div>
        </Card>
      </div>
    </div>
  );

  if (error) return (
    <div className="dashboard">
      <Navbar />
      <div className="content-wrapper">
        <h1 className="heading-1">Leaderboard</h1>
        <Card>
          <div className="error">{error}</div>
        </Card>
      </div>
    </div>
  );

  return (
    <div className="dashboard">
      <Navbar />
      <div className="content-wrapper">
        <h1 className="heading-1">Leaderboard</h1>
        <Card>
          <div className="leaderboard-container">
            {users.map((user) => (
              <div 
                key={user.email} 
                className={`leaderboard-entry ${user.email === currentUser ? 'current-user' : ''}`}
              >
                <div className="user-info">
                  <span className={getStatusClass(user.status)} />
                  <span>{user.email}</span>
                </div>
                <span>{Math.floor(user.totalSeconds / 3600)} hours</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
