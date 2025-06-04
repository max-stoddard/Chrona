// src/pages/Dashboard.tsx
import React from 'react';
import { Link } from "react-router-dom";
import logo from '../assets/Chrona.png';
import play from '../assets/play-button-arrowhead.png';
import avatar from '../assets/avatar.png';
import '../styles/dashboard.css';        // ← plain CSS, NOT Tailwind
import Navbar from '../components/Navbar'; 

export default function Dashboard() {
  return (
    <div className="dashboard">
      <Navbar />
      {/* top thin bar */}
      {/* <div className="rectangle" /> */}

      {/* welcome line */}
      <div className="frame">
        <div className="div-wrapper">
          <h1 className="text-wrapper">Welcome back, Sarah!</h1>
        </div>
      </div>

      {/* session card */}
      <div className="frame-wrapper">
        <div className="overlap-group-wrapper">
        <div className="overlap-group">
          <div className="card-background" />  {/* ← background box */}
          <p className="p">Ready for your next session?</p>
          <span className="text-wrapper-2">Mathematics</span>
          <span className="text-wrapper-3">Paper 1</span>
          <span className="text-wrapper-4">Scheduled for 10:00 AM</span>
          <div className="rectangle-3">
            <span className="text-wrapper-5">Start Session</span>
            <img className="play-button" src={play} alt="▶" />
          </div>
        </div>

        </div>
      </div>

      {/* header links + avatar
      <Link  to="/"        className="text-wrapper-6">Dashboard</Link>
      <Link  to="/subjects" className="text-wrapper-7">Subjects</Link>
      <img className="depth-frame" src={avatar} alt="avatar" />

      {/* logo */}
      {/* <div className="overlap-wrapper">
        <div className="overlap">
          <img className="adobe-express-file" src={logo} alt="logo" />
          <div className="depth-frame-2">
            <span className="text-wrapper-8">Chrona</span>
          </div>
        </div>
      </div> */}

      
      
    </div>
  );
}
