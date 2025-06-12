import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Card from '../components/Card';
import { supabase } from '../utils/supabase';
import '../styles/typography.css';
import '../styles/theme.css';

interface LeaderboardUser {
  email: string;
  totalSeconds: number;
}

export default function Leaderboard() {
  const [users, setUsers] = useState<LeaderboardUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get current user
        const { data: { user } } = await supabase.auth.getUser();
        if (user?.email) {
          setCurrentUser(user.email);
        }

        // Fetch leaderboard
        const api = import.meta.env.VITE_API_BASE_URL as string;
        const res = await fetch(`${api}/api/leaderboard`);
        
        if (!res.ok) throw new Error(await res.text());
        
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        console.error('Failed to load leaderboard', err);
        setError('Failed to load leaderboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };

  const formatUserName = (email: string): string => {
    const name = email.split('@')[0];
    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  if (loading) {
    return (
      <div className="dashboard">
        <Navbar />
        <div className="content-wrapper">
          <h1 className="heading-1">Leaderboard</h1>
          <Card>
            <p className="body-1">Loading leaderboard data...</p>
          </Card>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard">
        <Navbar />
        <div className="content-wrapper">
          <h1 className="heading-1">Leaderboard</h1>
          <Card>
            <p className="body-1" style={{ color: 'red' }}>{error}</p>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <Navbar />
      <div className="content-wrapper">
        <h1 className="heading-1">Leaderboard</h1>
        <Card>
          <div style={{ width: '100%' }}>
            {users.length === 0 ? (
              <p className="body-1">No study sessions recorded yet.</p>
            ) : (
              <div>
                {users.map((user, index) => (
                  <div 
                    key={user.email}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '12px 8px',
                      borderBottom: index < users.length - 1 ? '1px solid var(--color-border)' : 'none',
                      backgroundColor: currentUser === user.email ? '#f5f5f5' : 'transparent',
                      borderRadius: '4px'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      {index === 0 && <span style={{ fontSize: '1.1em', lineHeight: '1', display: 'flex', alignItems: 'center' }}>👑</span>}
                      <span className="heading-2" style={{ fontSize: '1.1em', fontWeight: 'bold' }}>{formatUserName(user.email)}</span>
                    </div>
                    <span className="body-1">{formatTime(user.totalSeconds)}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
