import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/Chrona.png";
import avatar from "../assets/avatar.png";
import "../styles/navbar.css";

const Navbar: React.FC = () => {
  return (
    <div className="navbar-depth-frame-2">
      <div className="navbar-depth-frame-wrapper">
        <div className="navbar-depth-frame-3">
          <img
            className="navbar-logo"
            alt="Chrona logo"
            src={logo}
          />
          <div className="navbar-div-wrapper">
            <div className="navbar-text-wrapper">Chrona</div>
          </div>
        </div>
      </div>

      <div className="navbar-depth-frame-4">
        <div className="navbar-depth-frame-5">
          <div className="navbar-depth-frame-6" />

          <div className="navbar-depth-frame-7">
            <Link to="/" className="navbar-link">Dashboard</Link>
          </div>

          <div className="navbar-depth-frame-7">
            <Link to="/subjects" className="navbar-link">Subjects</Link>
          </div>
        </div>

        <img className="navbar-avatar" src={avatar} alt="avatar" />
      </div>
    </div>
  );
};

export default Navbar;
