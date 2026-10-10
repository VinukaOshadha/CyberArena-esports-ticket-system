import {
  useEffect,
  useState
} from 'react';

import api
  from '../api/axios';

import TournamentCard
  from '../components/TournamentCard';


function Tournaments() {

  const [
    tournaments,
    setTournaments
  ] = useState([]);


  const [
    loading,
    setLoading
  ] = useState(true);


  const [
    error,
    setError
  ] = useState('');


  const fetchTournaments =
    async () => {

      try {

        setLoading(true);
        setError('');


        const response =
          await api.get(
            '/tournaments'
          );


        setTournaments(
          response.data.tournaments
        );


      } catch (error) {

        console.error(
          'Tournament loading error:',
          error
        );


        setError(
          'Unable to load tournaments. Please try again.'
        );


      } finally {

        setLoading(false);

      }

    };


  useEffect(() => {

    fetchTournaments();

  }, []);


  const handleReserved =
    (tournamentId) => {

      setTournaments(
        (currentTournaments) =>
          currentTournaments.map(
            (tournament) => {

              if (
                tournament._id ===
                tournamentId
              ) {

                return {
                  ...tournament,

                  availableSeats:
                    Math.max(
                      0,
                      tournament.availableSeats - 1
                    )
                };

              }


              return tournament;

            }
          )
      );

    };


  return (

    <div className="tournaments-page">

      <p className="small-title">
        COMPETITIVE EVENTS
      </p>


      <h1>
        TOURNAMENTS
      </h1>


      <p className="page-description">

        Explore upcoming CyberArena
        gaming tournaments and reserve
        your place in the competition.

      </p>


      {
        loading && (

          <p className="loading-message">
            Loading tournaments...
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
        tournaments.length === 0 && (

          <p className="empty-message">
            No tournaments are currently available.
          </p>

        )
      }


      {
        !loading &&
        !error &&
        tournaments.length > 0 && (

          <div className="tournament-grid">

            {
              tournaments.map(
                (tournament) => (

                  <TournamentCard
                    key={tournament._id}
                    tournament={tournament}
                    onReserved={handleReserved}
                  />

                )
              )
            }

          </div>

        )
      }

    </div>

  );

}


export default Tournaments;