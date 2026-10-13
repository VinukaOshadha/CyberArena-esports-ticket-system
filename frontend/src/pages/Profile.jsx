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