import '../styles/typography.css';
import '../styles/theme.css';
import Card from '../components/Card';
import { supabase } from '../utils/supabase';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Navbar from '../components/Navbar';

export default function Profile() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleSignOut = async () => {
    setIsLoading(true);
    try {
      await supabase.auth.signOut();
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="dashboard">
      <Navbar />
      <div className="content-wrapper">
        <h1 className="heading-1">Your Profile</h1>
        
        <Card>
          <h2 className="heading-2" style={{ marginBottom: '24px' }}>Account Settings</h2>
          
          <button
            className="button-secondary"
            onClick={handleSignOut}
            disabled={isLoading}
            style={{
              width: '100%',
              marginTop: '16px'
            }}
          >
            {isLoading ? 'Signing out...' : 'Sign out'}
          </button>
        </Card>
      </div>
    </div>
  );
}
