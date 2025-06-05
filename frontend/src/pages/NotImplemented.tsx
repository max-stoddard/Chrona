import { useNavigate } from 'react-router-dom';
import '../styles/typography.css';
import '../styles/theme.css';
import '../styles/notPages.css';        

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <main className="nf-wrapper">
      <h1 className="heading-1">Page not implemented</h1>
      <p  className="body-2">
        Sorry, we havn't implemented the page you're looking for.
      </p>

      <button
        className="button-start"
        onClick={() => navigate('/')} 
      >
        Back to dashboard
      </button>
    </main>
  );
}