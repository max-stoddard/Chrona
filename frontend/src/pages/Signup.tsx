import '../styles/typography.css';
import '../styles/theme.css';
import Card from '../components/Card';
import { useState } from 'react';
import { supabase } from '../utils/supabase';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setIsLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) throw error;

      if (data.user) {
        // Supabase will send a confirmation email
        navigate('/verify-email', { 
          state: { email } 
        });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to sign up');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      backgroundColor: '#f5f5f5'
    }}>
      <div style={{ maxWidth: '400px', width: '100%' }}>
        <Card>
          <h1 className="heading-1" style={{ marginBottom: '24px', textAlign: 'center' }}>Create Account</h1>
          <form onSubmit={handleSignup} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label className="body-1" style={{ display: 'block', marginBottom: '8px' }}>
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  border: '1px solid #ddd',
                  borderRadius: '6px',
                  fontSize: '16px'
                }}
                required
              />
            </div>
            
            <div>
              <label className="body-1" style={{ display: 'block', marginBottom: '8px' }}>
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  border: '1px solid #ddd',
                  borderRadius: '6px',
                  fontSize: '16px'
                }}
                required
                minLength={6}
              />
            </div>

            <div>
              <label className="body-1" style={{ display: 'block', marginBottom: '8px' }}>
                Confirm Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  border: '1px solid #ddd',
                  borderRadius: '6px',
                  fontSize: '16px'
                }}
                required
                minLength={6}
              />
            </div>

            {error && (
              <p style={{ color: 'red', margin: '8px 0' }} className="body-2">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="button-start"
              disabled={isLoading}
              style={{ marginTop: '8px' }}
            >
              {isLoading ? 'Creating account...' : 'Create account'}
            </button>

            <button
              type="button"
              className="button-secondary"
              onClick={() => navigate('/login')}
              disabled={isLoading}
            >
              Already have an account? Sign in
            </button>
          </form>
        </Card>
      </div>
    </div>
  );
}
