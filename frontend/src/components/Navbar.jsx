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


  const isAdmin =
    userInfo?.user?.role ===
    'ADMIN';


  const handleLogout =
    () => {

      logout();

      navigate('/');

    };


  const getNavClass =
    ({ isActive }) =>
      isActive
        ? 'main-nav-link active'
        : 'main-nav-link';


  return (

    <header className="cyber-header">

      <nav className="cyber-navbar">

        {/* =========================
            CYBERARENA LOGO
            ========================= */}

        <div className="cyber-navbar-brand">

          <NavLink
            to="/"
            className="cyber-logo"
          >

            CyberArena

          </NavLink>

        </div>


        {/* =========================
            MAIN NAVIGATION
            ========================= */}

        <div className="cyber-nav-links">

          <NavLink
            to="/"
            end
            className={
              getNavClass
            }
          >
            Home
          </NavLink>


          <NavLink
            to="/tournaments"
            className={
              getNavClass
            }
          >
            Tournaments
          </NavLink>


          <NavLink
            to="/my-tickets"
            className={
              getNavClass
            }
          >
            My Tickets
          </NavLink>


          <NavLink
            to="/leaderboard"
            className={
              getNavClass
            }
          >
            Leaderboard
          </NavLink>


          <NavLink
            to="/support"
            className={
              getNavClass
            }
          >
            Support
          </NavLink>


          {
            isAdmin && (

              <>

                <NavLink
                  to="/admin"
                  className={
                    ({ isActive }) =>
                      isActive
                        ? 'main-nav-link admin-link active'
                        : 'main-nav-link admin-link'
                  }
                >
                  Admin
                </NavLink>


                <NavLink
                  to="/admin/support"
                  className={
                    ({ isActive }) =>
                      isActive
                        ? 'main-nav-link admin-link active'
                        : 'main-nav-link admin-link'
                  }
                >
                  Inbox
                </NavLink>

              </>

            )
          }

        </div>


        {/* =========================
            USER AREA
            ========================= */}

        <div className="cyber-user-area">

          {
            userInfo

              ? (

                <>

                  <NavLink
                    to="/profile"
                    className="cyber-profile-link"
                  >

                    Profile

                  </NavLink>


                  <span className="cyber-player-id">

                    {
                      userInfo.user?.playerId ||
                      'PLAYER'
                    }

                  </span>


                  <button
                    type="button"
                    className="cyber-logout-button"
                    onClick={
                      handleLogout
                    }
                  >

                    Logout

                  </button>

                </>

              )

              : (

                <NavLink
                  to="/login"
                  className="cyber-login-button"
                >

                  Login

                </NavLink>

              )
          }

        </div>

      </nav>

    </header>

  );

}


export default Navbar;