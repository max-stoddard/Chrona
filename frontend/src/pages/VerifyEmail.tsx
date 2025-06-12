import '../styles/typography.css';
import '../styles/theme.css';
import Card from '../components/Card';
import { useLocation, useNavigate } from 'react-router-dom';

export default function VerifyEmail() {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || 'your email';

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
          <h1 className="heading-1" style={{ marginBottom: '24px', textAlign: 'center' }}>Verify Your Email</h1>
          <p className="body-1" style={{ marginBottom: '16px', textAlign: 'center' }}>
            We've sent a verification link to {email}. Please check your inbox and click the link to verify your account.
          </p>
          <button
            className="button-secondary"
            onClick={() => navigate('/login')}
            style={{ width: '100%' }}
          >
            Return to login
          </button>
        </Card>
      </div>
    </div>
  );
}
