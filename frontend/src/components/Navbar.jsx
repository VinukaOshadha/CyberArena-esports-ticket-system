import {
  useContext
} from 'react';

import {
  NavLink,
  useNavigate
} from 'react-router-dom';

import {
  AuthContext
} from '../context/AuthContext';


function Navbar() {

  const {
    userInfo,
    logout
  } = useContext(
    AuthContext
  );


  const navigate =
    useNavigate();


  const handleLogout =
    () => {

      logout();

      navigate('/');

    };


  const isAdmin =
    userInfo?.user?.role ===
    'ADMIN';


  return (

    <nav className="navbar">

      <NavLink
        to="/"
        className="logo"
      >
        CyberArena
      </NavLink>


      <div className="nav-links">

        <NavLink to="/">
          Home
        </NavLink>


        <NavLink to="/tournaments">
          Tournaments
        </NavLink>


        <NavLink to="/my-tickets">
          My Tickets
        </NavLink>


        <NavLink to="/leaderboard">
          Leaderboard
        </NavLink>


        <NavLink to="/support">
          Support
        </NavLink>


        {
          isAdmin && (

            <NavLink
              to="/admin"
              className="admin-nav-link"
            >
              Admin
            </NavLink>

          )
        }


        {
          userInfo ? (

            <div className="user-area">

              <NavLink
                to="/profile"
                className="profile-link"
              >
                Profile
              </NavLink>


              <span className="player-id">

                {
                  userInfo.user
                    ?.playerId
                }

              </span>


              <button
                className="logout-button"
                onClick={
                  handleLogout
                }
              >
                Logout
              </button>

            </div>

          ) : (

            <NavLink
              to="/login"
              className="login-button"
            >
              Login
            </NavLink>

          )
        }

      </div>

    </nav>

  );

}


export default Navbar;