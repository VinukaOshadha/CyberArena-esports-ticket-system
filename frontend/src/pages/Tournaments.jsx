import {
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react';

import {
  useNavigate
} from 'react-router-dom';

import api
  from '../api/axios';

import {
  AuthContext
} from '../context/AuthContext';


function Tournaments() {

  const navigate =
    useNavigate();


  const {
    userInfo
  } = useContext(
    AuthContext
  );


  const [tournaments, setTournaments] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState('');

  const [success, setSuccess] =
    useState('');

  const [reservingId, setReservingId] =
    useState(null);

  const [searchTerm, setSearchTerm] =
    useState('');

  const [gameFilter, setGameFilter] =
    useState('ALL');


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
          response.data.tournaments ||
          []
        );


      } catch (error) {

        setError(
          error.response?.data?.message ||
          'Unable to load tournaments.'
        );


      } finally {

        setLoading(false);

      }

    };


  useEffect(() => {

    fetchTournaments();

  }, []);


  const games =
    useMemo(() => {

      const gameNames =
        tournaments
          .map(
            (tournament) =>
              tournament.game
          )
          .filter(Boolean);


      return [
        ...new Set(gameNames)
      ].sort();

    }, [tournaments]);


  const filteredTournaments =
    useMemo(() => {

      const search =
        searchTerm
          .trim()
          .toLowerCase();


      return tournaments.filter(
        (tournament) => {

          const matchesSearch =

            tournament.title
              ?.toLowerCase()
              .includes(search)

            ||

            tournament.game
              ?.toLowerCase()
              .includes(search)

            ||

            tournament.description
              ?.toLowerCase()
              .includes(search);


          const matchesGame =

            gameFilter === 'ALL'

            ||

            tournament.game ===
              gameFilter;


          return (
            matchesSearch &&
            matchesGame
          );

        }
      );

    }, [
      tournaments,
      searchTerm,
      gameFilter
    ]);


  const clearFilters =
    () => {

      setSearchTerm('');
      setGameFilter('ALL');

    };


  const handleReserve =
    async (tournamentId) => {

      if (!userInfo) {

        navigate('/login');

        return;

      }


      try {

        setReservingId(
          tournamentId
        );

        setError('');
        setSuccess('');


        const response =
          await api.post(
            `/tickets/reserve/${tournamentId}`
          );


        setSuccess(
          response.data.message ||
          'Ticket reserved successfully.'
        );


        setTournaments(
          (current) =>
            current.map(
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


      } catch (error) {

        setError(
          error.response?.data?.message ||
          'Unable to reserve ticket.'
        );


      } finally {

        setReservingId(null);

      }

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
        Discover upcoming CyberArena tournaments
        and reserve your place.
      </p>


      <div className="tournament-filter-panel">

        <div className="tournament-search-box">

          <label>
            SEARCH
          </label>

          <input
            type="text"
            placeholder="Search tournament, game or description..."
            value={searchTerm}
            onChange={
              (event) =>
                setSearchTerm(
                  event.target.value
                )
            }
          />

        </div>


        <div className="tournament-game-filter">

          <label>
            GAME
          </label>

          <select
            value={gameFilter}
            onChange={
              (event) =>
                setGameFilter(
                  event.target.value
                )
            }
          >

            <option value="ALL">
              ALL GAMES
            </option>

            {
              games.map(
                (game) => (

                  <option
                    value={game}
                    key={game}
                  >
                    {game}
                  </option>

                )
              )
            }

          </select>

        </div>


        <button
          className="clear-filter-button"
          onClick={clearFilters}
        >
          CLEAR
        </button>

      </div>


      {
        !loading && (

          <p className="tournament-result-count">

            Showing{' '}

            <strong>
              {filteredTournaments.length}
            </strong>

            {' '}of{' '}

            <strong>
              {tournaments.length}
            </strong>

            {' '}tournaments

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
        success && (
          <p className="success-message">
            {success}
          </p>
        )
      }


      {
        loading && (
          <p className="loading-message">
            Loading tournaments...
          </p>
        )
      }


      {
        !loading &&
        filteredTournaments.length === 0 && (

          <div className="filter-empty-state">

            <p>
              No tournaments match your search.
            </p>

            <button onClick={clearFilters}>
              CLEAR FILTERS
            </button>

          </div>

        )
      }


      {
        !loading &&
        filteredTournaments.length > 0 && (

          <div className="tournament-grid">

            {
              filteredTournaments.map(
                (tournament) => (

                  <div
                    className="tournament-card"
                    key={tournament._id}
                  >

                    <p className="game-name">
                      {tournament.game}
                    </p>


                    <h2>
                      {tournament.title}
                    </h2>


                    <p className="tournament-description">
                      {tournament.description}
                    </p>


                    <div className="tournament-info">

                      <p>
                        <strong>DATE:</strong>{' '}
                        {
                          new Date(
                            tournament.date
                          ).toLocaleDateString()
                        }
                      </p>


                      <p>
                        <strong>PRICE:</strong>{' '}
                        LKR {tournament.price}
                      </p>


                      <p>
                        <strong>AVAILABLE:</strong>{' '}
                        {tournament.availableSeats}
                        {' / '}
                        {tournament.totalSeats}
                      </p>

                    </div>


                    <button
                      className="reserve-button"
                      disabled={
                        reservingId ===
                          tournament._id
                        ||
                        tournament.availableSeats <= 0
                      }
                      onClick={
                        () =>
                          handleReserve(
                            tournament._id
                          )
                      }
                    >

                      {
                        tournament.availableSeats <= 0

                          ? 'SOLD OUT'

                          : reservingId === tournament._id

                            ? 'RESERVING...'

                            : 'RESERVE TICKET'
                      }

                    </button>

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


export default Tournaments;