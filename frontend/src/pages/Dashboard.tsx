import '../styles/dashboard.css';
import '../styles/typography.css';
import '../styles/theme.css';

import Navbar from '../components/Navbar';
import Card from '../components/Card';

import playIcon from '../assets/play-button-arrowhead.png';

export default function Dashboard() {
  const handleStartSession = () => {
    // TODO: implement start session logic
    console.log('Session started');
  };

  return (
    <div className="dashboard">
      <Navbar />

      <div className="content-wrapper">
        {/* Heading */}
        <h1 className="heading-1">Welcome back, Sarah!</h1>

        {/* Generic Card wrapping session content */}
        <Card>
          <p className="heading-2">Ready for your next session?</p>
          <p className="body-1">Mathematics</p>
          <p className="body-1">Paper 1</p>
          <p className="body-2">Scheduled for 10:00 AM</p>
          <button className="button-start" onClick={handleStartSession}>
            <img
              className="icon-play"
              src={playIcon}
              alt="▶"
            />
            <span className="button-text">Start Session</span>
          </button>
        </Card>
      </div>
    </div>
  );
}