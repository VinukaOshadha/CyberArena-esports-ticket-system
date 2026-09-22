import { NavLink } from 'react-router-dom';
import '../App.css';

function Navbar() {
  return (
    <nav className="navbar">

      <NavLink to="/" className="logo">
        CyberArena
      </NavLink>

      <div className="nav-links">

        <NavLink to="/">
          Home
        </NavLink>

        <NavLink to="/tournaments">
          Tournaments
        </NavLink>

        <NavLink to="/leaderboard">
          Leaderboard
        </NavLink>

        <NavLink to="/support">
          Support
        </NavLink>

        <NavLink to="/login" className="login-button">
          Login
        </NavLink>

      </div>

    </nav>
  );
}

export default Navbar;