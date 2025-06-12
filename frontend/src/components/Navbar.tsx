import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/Chrona.png';
import avatar from '../assets/avatar.png';
import '../styles/navbar.css';

const Navbar: React.FC = () => (
  <div className="navbar">
    <Link to="/" className="navbar-brand">
      <img className="navbar-logo" src={logo} alt="Chrona logo" />
      <span className="navbar-text">Chrona</span>
    </Link>

    <div className="navbar-links">
      <Link to="/" className="navbar-link">
        Dashboard
      </Link>
      <Link to="/subjects" className="navbar-link">
        Subjects
      </Link>
      <Link to="/leaderboard" className="navbar-link">
        Leaderboard
      </Link>
      <Link to="/profile">
        <img className="navbar-avatar" src={avatar} alt="avatar" />
      </Link>
    </div>
  </div>
);

export default Navbar;