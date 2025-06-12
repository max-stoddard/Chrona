import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Card from '../components/Card';
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

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
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

    fetchLeaderboard();
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
                      padding: '12px 0',
                      borderBottom: index < users.length - 1 ? '1px solid var(--color-border)' : 'none'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <span className="body-1" style={{ minWidth: '30px' }}>#{index + 1}</span>
                      <span className="body-1">{formatUserName(user.email)}</span>
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
