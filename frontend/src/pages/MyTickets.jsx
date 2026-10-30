import {
  useEffect,
  useState,
} from 'react';

import api from '../api/axios';


function MyTickets() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [cancellingId, setCancellingId] = useState(null);


  // =========================================================
  // LOAD USER TICKETS
  // =========================================================

  const fetchTickets = async () => {
    try {
      setLoading(true);
      setError('');

      const { data } = await api.get('/tickets/my');

      // Hide tickets that were already cancelled
      // before this page was opened/refreshed.
      const activeTickets = data.filter((ticket) => {
        const status = String(
          ticket.status || ''
        ).toUpperCase();

        return status !== 'CANCELLED';
      });

      setTickets(activeTickets);

    } catch (err) {
      console.error(
        'MY TICKETS ERROR:',
        err.response?.data || err.message
      );

      setError(
        err.response?.data?.message ||
        'Could not load your tickets.'
      );

    } finally {
      setLoading(false);
    }
  };


  // =========================================================
  // LOAD WHEN PAGE OPENS
  // =========================================================

  useEffect(() => {
    fetchTickets();
  }, []);


  // =========================================================
  // CANCEL TICKET
  // =========================================================

  const handleCancel = async (ticketId) => {
    const confirmed = window.confirm(
      'Are you sure you want to cancel this ticket?'
    );

    if (!confirmed) {
      return;
    }

    try {
      setCancellingId(ticketId);
      setError('');
      setSuccess('');

      const response = await api.patch(
        `/tickets/cancel/${ticketId}`
      );


      // =====================================================
      // STEP 1:
      // Show CANCELLED status immediately
      // =====================================================

      setTickets((currentTickets) =>
        currentTickets.map((ticket) => {
          if (ticket._id === ticketId) {
            return {
              ...ticket,
              status: 'CANCELLED',
            };
          }

          return ticket;
        })
      );


      setSuccess(
        response.data.message ||
        'Ticket cancelled successfully.'
      );


      // =====================================================
      // Tell Tournaments page seat data has changed
      // =====================================================

      window.dispatchEvent(
        new Event('cyberarena-tickets-changed')
      );


      // =====================================================
      // STEP 2:
      // Remove cancelled card after 1.5 seconds
      // =====================================================

      setTimeout(() => {
        setTickets((currentTickets) =>
          currentTickets.filter(
            (ticket) => ticket._id !== ticketId
          )
        );
      }, 1500);


    } catch (err) {
      console.error(
        'CANCEL TICKET ERROR:',
        err.response?.data || err.message
      );

      setError(
        err.response?.data?.message ||
        'Unable to cancel ticket.'
      );

    } finally {
      setCancellingId(null);
    }
  };


  // =========================================================
  // ACTIVE TICKET COUNT
  // =========================================================

  const activeTicketCount = tickets.filter(
    (ticket) =>
      String(
        ticket.status || ''
      ).toUpperCase() !== 'CANCELLED'
  ).length;


  // =========================================================
  // PAGE
  // =========================================================

  return (
    <div className="tickets-page">

      {/* PAGE HEADER */}

      <p className="small-title">
        PLAYER RESERVATIONS
      </p>

      <h1>
        MY TICKETS
      </h1>

      <p className="page-description">
        Review and manage your active tournament reservations.
      </p>


      {/* =====================================================
          SUMMARY CARDS
          ===================================================== */}

      <div className="ticket-summary-grid">

        <div className="ticket-summary-card">
          <span>
            ACTIVE TICKETS
          </span>

          <strong>
            {activeTicketCount}
          </strong>
        </div>


        <div className="ticket-summary-card">
          <span>
            MAX PER TOURNAMENT
          </span>

          <strong>
            3
          </strong>
        </div>


        <div className="ticket-summary-card">
          <span>
            STATUS
          </span>

          <strong>
            RESERVED
          </strong>
        </div>

      </div>


      {/* =====================================================
          ERROR MESSAGE
          ===================================================== */}

      {error && (
        <p className="error-message">
          {error}
        </p>
      )}


      {/* =====================================================
          SUCCESS MESSAGE
          ===================================================== */}

      {success && (
        <p className="success-message">
          {success}
        </p>
      )}


      {/* =====================================================
          LOADING
          ===================================================== */}

      {loading && (
        <p className="loading-message">
          Loading your tickets...
        </p>
      )}


      {/* =====================================================
          EMPTY STATE
          ===================================================== */}

      {!loading &&
        !error &&
        tickets.length === 0 && (
          <p className="empty-message">
            You currently have no active tickets.
          </p>
        )}


      {/* =====================================================
          TICKET CARDS
          ===================================================== */}

      {!loading &&
        tickets.length > 0 && (
          <div className="tickets-list">

            {tickets.map((ticket) => {
              const tournament =
                ticket.tournament;

              const status =
                String(
                  ticket.status || 'RESERVED'
                ).toUpperCase();

              const isCancelled =
                status === 'CANCELLED';


              return (
                <div
                  className="ticket-card"
                  key={ticket._id}
                >

                  {/* GAME */}

                  <p className="small-title">
                    {tournament?.game ||
                      'CYBERARENA EVENT'}
                  </p>


                  {/* TOURNAMENT TITLE */}

                  <h2>
                    {tournament?.title ||
                      'Tournament'}
                  </h2>


                  {/* TICKET CODE */}

                  <p>
                    <strong>
                      TICKET CODE:
                    </strong>{' '}

                    {ticket.ticketCode}
                  </p>


                  {/* DATE */}

                  <p>
                    <strong>
                      DATE:
                    </strong>{' '}

                    {tournament?.date
                      ? new Date(
                          tournament.date
                        ).toLocaleDateString()
                      : 'N/A'}
                  </p>


                  {/* PRICE */}

                  <p>
                    <strong>
                      PRICE:
                    </strong>{' '}

                    LKR {ticket.price}
                  </p>


                  {/* STATUS */}

                  <p
                    className={
                      isCancelled
                        ? 'ticket-status cancelled'
                        : 'ticket-status'
                    }
                  >
                    {isCancelled
                      ? 'CANCELLED'
                      : 'RESERVED'}
                  </p>


                  {/* CANCEL BUTTON */}

                  {!isCancelled && (
                    <button
                      className="cancel-ticket-button"
                      disabled={
                        cancellingId === ticket._id
                      }
                      onClick={() =>
                        handleCancel(ticket._id)
                      }
                    >
                      {cancellingId === ticket._id
                        ? 'CANCELLING...'
                        : 'CANCEL TICKET'}
                    </button>
                  )}

                </div>
              );
            })}

          </div>
        )}

    </div>
  );
}


export default MyTickets;