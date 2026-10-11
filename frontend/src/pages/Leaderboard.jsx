import {
  useEffect,
  useState
} from 'react';

import api
  from '../api/axios';


function Leaderboard() {

  const [
    players,
    setPlayers
  ] = useState([]);


  const [
    loading,
    setLoading
  ] = useState(true);


  const [
    error,
    setError
  ] = useState('');


  useEffect(() => {

    const fetchLeaderboard =
      async () => {

        try {

          setLoading(true);
          setError('');


          const response =
            await api.get(
              '/leaderboard'
            );


          setPlayers(
            response.data.leaderboard
          );


        } catch (error) {

          console.error(
            'Leaderboard loading error:',
            error
          );


          setError(
            'Unable to load leaderboard. Please try again.'
          );


        } finally {

          setLoading(false);

        }

      };


    fetchLeaderboard();

  }, []);


  return (

    <div className="leaderboard-page">

      <p className="small-title">
        PLAYER RANKINGS
      </p>


      <h1>
        LEADERBOARD
      </h1>


      <p className="page-description">

        Top CyberArena players ranked
        by points and tournament wins.

      </p>


      {
        loading && (

          <p className="loading-message">
            Loading leaderboard...
          </p>

        )
      }


      {
        error && (

          <p className="error-message">
            {error}
          </p>

        )
      }


      {
        !loading &&
        !error &&
        players.length === 0 && (

          <p className="empty-message">

            No players are currently
            available on the leaderboard.

          </p>

        )
      }


      {
        !loading &&
        !error &&
        players.length > 0 && (

          <div className="leaderboard-table">

            <div className="leaderboard-row header">

              <span>
                RANK
              </span>

              <span>
                PLAYER
              </span>

              <span>
                PLAYER ID
              </span>

              <span>
                POINTS
              </span>

              <span>
                WINS
              </span>

            </div>


            {
              players.map(
                (player) => (

                  <div
                    className="leaderboard-row"
                    key={player.id}
                  >

                    <span className="rank-number">

                      #{player.rank}

                    </span>


                    <span>

                      {player.name}

                    </span>


                    <span className="leaderboard-player-id">

                      {player.playerId}

                    </span>


                    <span>

                      {player.points}

                    </span>


                    <span>

                      {player.wins}

                    </span>

                  </div>

                )
              )
            }

          </div>

        )
      }

    </div>

  );

}


export default Leaderboard;