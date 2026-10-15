import {
  useEffect,
  useState
} from 'react';

import api
  from '../api/axios';


function Profile() {

  const [
    user,
    setUser
  ] = useState(null);


  const [
    stats,
    setStats
  ] = useState({
    totalTickets: 0,
    activeTickets: 0,
    cancelledTickets: 0
  });


  const [
    loading,
    setLoading
  ] = useState(true);


  const [
    error,
    setError
  ] = useState('');


  useEffect(() => {

    const fetchProfile =
      async () => {

        try {

          setLoading(true);
          setError('');


          const response =
            await api.get(
              '/auth/me'
            );


          setUser(
            response.data.user
          );


          setStats(
            response.data.stats || {
              totalTickets: 0,
              activeTickets: 0,
              cancelledTickets: 0
            }
          );


        } catch (error) {

          console.error(
            'Profile loading error:',
            error
          );


          setError(
            error.response?.data?.message ||
            'Unable to load player profile.'
          );


        } finally {

          setLoading(false);

        }

      };


    fetchProfile();

  }, []);


  if (loading) {

    return (

      <div className="profile-page">

        <p className="loading-message">
          Loading player profile...
        </p>

      </div>

    );

  }


  if (error) {

    return (

      <div className="profile-page">

        <p className="error-message">
          {error}
        </p>

      </div>

    );

  }


  return (

    <div className="profile-page">

      <div className="profile-card">

        <p className="small-title">
          PLAYER IDENTITY
        </p>


        <h1>
          PLAYER PROFILE
        </h1>


        <div className="profile-avatar">

          {
            user?.name
              ?.charAt(0)
              .toUpperCase()
          }

        </div>


        <h2>
          {user?.name}
        </h2>


        <p className="profile-player-id">
          {user?.playerId}
        </p>


        {/* PLAYER STATISTICS */}

        <div className="profile-stats">

          <div className="profile-stat-card">

            <span>
              POINTS
            </span>

            <strong>
              {user?.points || 0}
            </strong>

          </div>


          <div className="profile-stat-card">

            <span>
              WINS
            </span>

            <strong>
              {user?.wins || 0}
            </strong>

          </div>


          <div className="profile-stat-card">

            <span>
              TOTAL TICKETS
            </span>

            <strong>
              {stats.totalTickets}
            </strong>

          </div>


          <div className="profile-stat-card">

            <span>
              ACTIVE
            </span>

            <strong>
              {stats.activeTickets}
            </strong>

          </div>


          <div className="profile-stat-card">

            <span>
              CANCELLED
            </span>

            <strong>
              {stats.cancelledTickets}
            </strong>

          </div>

        </div>


        {/* PLAYER DETAILS */}

        <div className="profile-details">

          <div className="profile-row">

            <span>
              PLAYER NAME
            </span>

            <strong>
              {user?.name}
            </strong>

          </div>


          <div className="profile-row">

            <span>
              EMAIL
            </span>

            <strong>
              {user?.email}
            </strong>

          </div>


          <div className="profile-row">

            <span>
              PLAYER ID
            </span>

            <strong>
              {user?.playerId}
            </strong>

          </div>


          <div className="profile-row">

            <span>
              POINTS
            </span>

            <strong>
              {user?.points || 0}
            </strong>

          </div>


          <div className="profile-row">

            <span>
              WINS
            </span>

            <strong>
              {user?.wins || 0}
            </strong>

          </div>


          <div className="profile-row">

            <span>
              MEMBER SINCE
            </span>

            <strong>

              {
                user?.createdAt
                  ? new Date(
                      user.createdAt
                    ).toLocaleDateString(
                      'en-US',
                      {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      }
                    )

                  : 'N/A'
              }

            </strong>

          </div>

        </div>

      </div>

    </div>

  );

}


export default Profile;