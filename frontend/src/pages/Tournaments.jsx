import {
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import {
  useNavigate,
} from 'react-router-dom';

import api from '../api/axios';

import {
  AuthContext,
} from '../context/AuthContext';


// =====================================================
// GET CORRECT IMAGE FOR EACH GAME
// =====================================================

const getTournamentImage = (gameName) => {
  const game =
    gameName?.trim().toLowerCase() || '';


  // VALORANT
  if (
    game.includes('valorant')
  ) {
    return '/tournament-images/valorant.jpg';
  }


  // COUNTER STRIKE 2
  if (
    game.includes('counter strike') ||
    game.includes('counter-strike') ||
    game.includes('cs2')
  ) {
    return '/tournament-images/counter-strike-2.png';
  }


  // LEAGUE OF LEGENDS
  if (
    game.includes('league of legends') ||
    game === 'lol'
  ) {
    return '/tournament-images/league-of-legends.jpg';
  }


  return null;
};


// =====================================================
// TOURNAMENT PAGE
// =====================================================

function Tournaments() {
  const navigate = useNavigate();

  const {
    userInfo,
  } = useContext(
    AuthContext
  );


  // =====================================================
  // STATES
  // =====================================================

  const [
    tournaments,
    setTournaments,
  ] = useState([]);


  const [
    myTickets,
    setMyTickets,
  ] = useState([]);


  const [
    loading,
    setLoading,
  ] = useState(true);


  const [
    error,
    setError,
  ] = useState('');


  const [
    success,
    setSuccess,
  ] = useState('');


  const [
    reservingId,
    setReservingId,
  ] = useState(null);


  const [
    searchTerm,
    setSearchTerm,
  ] = useState('');


  const [
    gameFilter,
    setGameFilter,
  ] = useState('ALL');


  // =====================================================
  // LOAD TOURNAMENTS
  // =====================================================

  const fetchTournaments =
    async (showLoading = true) => {

      try {
        if (showLoading) {
          setLoading(true);
        }

        setError('');


        const response =
          await api.get(
            '/tournaments'
          );


        /*
          Supports both:

          [
            tournament,
            tournament
          ]

          AND

          {
            tournaments: [...]
          }
        */

        const tournamentData =
          Array.isArray(
            response.data
          )
            ? response.data
            : response.data.tournaments ||
              [];


        setTournaments(
          tournamentData
        );

      } catch (err) {
        console.error(
          'TOURNAMENT LOADING ERROR:',
          err.response?.data ||
          err.message
        );


        setError(
          err.response?.data?.message ||
          'Unable to load tournaments.'
        );

      } finally {
        if (showLoading) {
          setLoading(false);
        }
      }
    };


  // =====================================================
  // LOAD LOGGED-IN USER'S TICKETS
  // =====================================================

  const fetchMyTickets =
    async () => {

      if (!userInfo?.token) {
        setMyTickets([]);
        return;
      }


      try {
        const response =
          await api.get(
            '/tickets/my'
          );


        const ticketData =
          Array.isArray(
            response.data
          )
            ? response.data
            : response.data.tickets ||
              [];


        setMyTickets(
          ticketData
        );

      } catch (err) {
        console.error(
          'MY TICKETS LOADING ERROR:',
          err.response?.data ||
          err.message
        );

        setMyTickets([]);
      }
    };


  // =====================================================
  // INITIAL LOAD + REFRESH AFTER TICKET CHANGES
  // =====================================================

  useEffect(() => {
    const loadPageData =
      async () => {

        await Promise.all([
          fetchTournaments(true),
          fetchMyTickets(),
        ]);

      };


    loadPageData();


    // Called from MyTickets.jsx after cancellation
    const handleTicketChange =
      async () => {

        await Promise.all([
          fetchTournaments(false),
          fetchMyTickets(),
        ]);

      };


    // Refresh when browser window becomes active again
    const handleWindowFocus =
      async () => {

        await Promise.all([
          fetchTournaments(false),
          fetchMyTickets(),
        ]);

      };


    window.addEventListener(
      'cyberarena-tickets-changed',
      handleTicketChange
    );


    window.addEventListener(
      'focus',
      handleWindowFocus
    );


    return () => {
      window.removeEventListener(
        'cyberarena-tickets-changed',
        handleTicketChange
      );


      window.removeEventListener(
        'focus',
        handleWindowFocus
      );
    };

  }, [
    userInfo?.token,
  ]);


  // =====================================================
  // COUNT ACTIVE TICKETS FOR ONE TOURNAMENT
  // =====================================================

  const getReservedTicketCount =
    (tournamentId) => {

      return myTickets.filter(
        (ticket) => {

          const ticketTournamentId =
            ticket.tournament?._id ||
            ticket.tournament;


          const ticketStatus =
            String(
              ticket.status || ''
            ).toUpperCase();


          return (
            String(
              ticketTournamentId
            ) ===
              String(
                tournamentId
              ) &&

            ticketStatus ===
              'RESERVED'
          );

        }
      ).length;
    };


  // =====================================================
  // GAME FILTER OPTIONS
  // =====================================================

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
        ...new Set(
          gameNames
        ),
      ].sort();

    }, [
      tournaments,
    ]);


  // =====================================================
  // SEARCH + FILTER
  // =====================================================

  const filteredTournaments =
    useMemo(() => {

      const search =
        searchTerm
          .trim()
          .toLowerCase();


      return tournaments.filter(
        (tournament) => {

          const title =
            tournament.title
              ?.toLowerCase() ||
            '';


          const game =
            tournament.game
              ?.toLowerCase() ||
            '';


          const description =
            tournament.description
              ?.toLowerCase() ||
            '';


          const matchesSearch =
            title.includes(
              search
            ) ||

            game.includes(
              search
            ) ||

            description.includes(
              search
            );


          const matchesGame =
            gameFilter ===
              'ALL' ||

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
      gameFilter,
    ]);


  // =====================================================
  // CLEAR SEARCH + FILTER
  // =====================================================

  const clearFilters = () => {
    setSearchTerm('');
    setGameFilter('ALL');
  };


  // =====================================================
  // RESERVE TICKET
  // =====================================================

  const handleReserve =
    async (
      tournamentId
    ) => {

      // User must login
      if (!userInfo?.token) {
        navigate('/login');
        return;
      }


      // Current number of active tickets
      const bookedCount =
        getReservedTicketCount(
          tournamentId
        );


      // Maximum 3 tickets
      if (bookedCount >= 3) {
        setSuccess('');

        setError(
          'Maximum 3 tickets allowed per tournament.'
        );

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


        /*
          IMPORTANT:
          Do not manually subtract seats here.

          Reload latest values from MongoDB/backend.
        */

        await Promise.all([
          fetchTournaments(false),
          fetchMyTickets(),
        ]);


      } catch (err) {
        console.error(
          'RESERVATION ERROR:',
          err.response?.data ||
          err.message
        );


        setError(
          err.response?.data?.message ||
          'Unable to reserve ticket.'
        );


      } finally {
        setReservingId(
          null
        );
      }
    };


  // =====================================================
  // PAGE
  // =====================================================

  return (
    <div className="tournaments-page">


      {/* ===================================================
          PAGE HEADER
          =================================================== */}

      <p className="small-title">
        COMPETITIVE EVENTS
      </p>


      <h1>
        TOURNAMENTS
      </h1>


      <p className="page-description">
        Discover upcoming CyberArena
        tournaments and reserve your
        place in the competition.
      </p>


      {/* ===================================================
          SEARCH + FILTER
          =================================================== */}

      <div className="tournament-filter-panel">


        <div className="tournament-search-box">

          <label>
            SEARCH
          </label>


          <input
            type="text"
            placeholder="Search tournament, game or description..."
            value={
              searchTerm
            }
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
            value={
              gameFilter
            }
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
                    value={
                      game
                    }
                    key={
                      game
                    }
                  >
                    {game}
                  </option>

                )
              )
            }

          </select>

        </div>


        <button
          type="button"
          className="clear-filter-button"
          onClick={
            clearFilters
          }
        >
          CLEAR
        </button>

      </div>


      {/* ===================================================
          RESULT COUNT
          =================================================== */}

      {
        !loading && (

          <p className="tournament-result-count">

            Showing{' '}

            <strong>
              {
                filteredTournaments.length
              }
            </strong>

            {' '}of{' '}

            <strong>
              {
                tournaments.length
              }
            </strong>

            {' '}tournaments

          </p>

        )
      }


      {/* ===================================================
          ERROR MESSAGE
          =================================================== */}

      {
        error && (

          <p className="error-message">
            {error}
          </p>

        )
      }


      {/* ===================================================
          SUCCESS MESSAGE
          =================================================== */}

      {
        success && (

          <p className="success-message">
            {success}
          </p>

        )
      }


      {/* ===================================================
          LOADING
          =================================================== */}

      {
        loading && (

          <p className="loading-message">
            Loading tournaments...
          </p>

        )
      }


      {/* ===================================================
          EMPTY RESULT
          =================================================== */}

      {
        !loading &&
        filteredTournaments.length ===
          0 && (

          <p className="empty-message">
            No tournaments found.
          </p>

        )
      }


      {/* ===================================================
          TOURNAMENT GRID
          =================================================== */}

      {
        !loading &&
        filteredTournaments.length >
          0 && (

          <div className="tournament-grid">


            {
              filteredTournaments.map(
                (tournament) => {


                  const image =
                    getTournamentImage(
                      tournament.game
                    );


                  const bookedCount =
                    getReservedTicketCount(
                      tournament._id
                    );


                  const maxTicketsReached =
                    bookedCount >= 3;


                  const soldOut =
                    tournament.availableSeats <=
                    0;


                  const isReserving =
                    reservingId ===
                    tournament._id;


                  return (

                    <div
                      className="tournament-card"
                      key={
                        tournament._id
                      }
                    >


                      {/* ===============================
                          TOURNAMENT IMAGE
                          =============================== */}

                      {
                        image && (

                          <div className="tournament-image-wrapper">

                            <img
                              src={
                                image
                              }
                              alt={
                                tournament.game
                              }
                              className="tournament-image"
                            />

                          </div>

                        )
                      }


                      {/* ===============================
                          CARD CONTENT
                          =============================== */}

                      <div className="tournament-card-content">


                        <p className="game-name">
                          {
                            tournament.game
                          }
                        </p>


                        <h2>
                          {
                            tournament.title
                          }
                        </h2>


                        <p className="tournament-description">
                          {
                            tournament.description
                          }
                        </p>


                        <div className="tournament-info">


                          <p>

                            <strong>
                              DATE:
                            </strong>{' '}

                            {
                              new Date(
                                tournament.date
                              ).toLocaleDateString()
                            }

                          </p>


                          <p>

                            <strong>
                              PRICE:
                            </strong>{' '}

                            LKR{' '}

                            {
                              tournament.price
                            }

                          </p>


                          <p>

                            <strong>
                              AVAILABLE:
                            </strong>{' '}

                            {
                              tournament.availableSeats
                            }

                            {' / '}

                            {
                              tournament.totalSeats
                            }

                          </p>


                          {/* USER'S CURRENT TICKET COUNT */}

                          {
                            userInfo?.token && (

                              <p className="user-ticket-count">

                                <strong>
                                  YOUR TICKETS:
                                </strong>{' '}

                                {
                                  bookedCount
                                }

                                {' / 3'}

                              </p>

                            )
                          }


                        </div>


                        {/* ===============================
                            RESERVE BUTTON
                            =============================== */}

                        <button
                          className="reserve-button"

                          disabled={
                            isReserving ||
                            soldOut ||
                            maxTicketsReached
                          }

                          onClick={
                            () =>
                              handleReserve(
                                tournament._id
                              )
                          }
                        >

                          {
                            soldOut

                              ? 'SOLD OUT'

                              : maxTicketsReached

                                ? 'MAX 3 TICKETS'

                                : isReserving

                                  ? 'RESERVING...'

                                  : userInfo?.token

                                    ? `RESERVE TICKET (${bookedCount}/3)`

                                    : 'RESERVE TICKET'
                          }

                        </button>


                      </div>

                    </div>

                  );

                }
              )
            }


          </div>

        )
      }


    </div>
  );
}


export default Tournaments;