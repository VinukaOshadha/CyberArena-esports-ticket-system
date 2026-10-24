import {
  useEffect,
  useMemo,
  useState
} from 'react';

import api
  from '../api/axios';


function MyTickets() {

  const [tickets, setTickets] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState('');

  const [success, setSuccess] =
    useState('');

  const [cancellingId, setCancellingId] =
    useState(null);

  const [statusFilter, setStatusFilter] =
    useState('ALL');


  const fetchTickets =
    async () => {

      try {

        setLoading(true);
        setError('');


        const response =
          await api.get(
            '/tickets/my'
          );


        setTickets(
          response.data.tickets ||
          []
        );


      } catch (error) {

        setError(
          error.response?.data?.message ||
          'Unable to load your tickets.'
        );


      } finally {

        setLoading(false);

      }

    };


  useEffect(() => {

    fetchTickets();

  }, []);


  const reservedCount =
    tickets.filter(
      (ticket) =>
        ticket.status ===
        'RESERVED'
    ).length;


  const cancelledCount =
    tickets.filter(
      (ticket) =>
        ticket.status ===
        'CANCELLED'
    ).length;


  const filteredTickets =
    useMemo(() => {

      if (
        statusFilter === 'ALL'
      ) {

        return tickets;

      }


      return tickets.filter(
        (ticket) =>
          ticket.status ===
          statusFilter
      );

    }, [
      tickets,
      statusFilter
    ]);


  const handleCancel =
    async (ticketId) => {

      const confirmed =
        window.confirm(
          'Are you sure you want to cancel this ticket?'
        );


      if (!confirmed) {
        return;
      }


      try {

        setCancellingId(ticketId);

        setError('');
        setSuccess('');


        const response =
          await api.patch(
            `/tickets/cancel/${ticketId}`
          );


        setTickets(
          (current) =>
            current.map(
              (ticket) => {

                if (
                  ticket._id ===
                  ticketId
                ) {

                  return {
                    ...ticket,
                    status: 'CANCELLED'
                  };

                }


                return ticket;

              }
            )
        );


        setSuccess(
          response.data.message ||
          'Ticket cancelled successfully.'
        );


      } catch (error) {

        setError(
          error.response?.data?.message ||
          'Unable to cancel ticket.'
        );


      } finally {

        setCancellingId(null);

      }

    };


  return (

    <div className="tickets-page">

      <p className="small-title">
        PLAYER RESERVATIONS
      </p>


      <h1>
        MY TICKETS
      </h1>


      <p className="page-description">
        Review your tournament reservations
        and ticket history.
      </p>


      <div className="ticket-summary-grid">

        <div className="ticket-summary-card">

          <span>TOTAL</span>

          <strong>
            {tickets.length}
          </strong>

        </div>


        <div className="ticket-summary-card">

          <span>RESERVED</span>

          <strong>
            {reservedCount}
          </strong>

        </div>


        <div className="ticket-summary-card">

          <span>CANCELLED</span>

          <strong>
            {cancelledCount}
          </strong>

        </div>

      </div>


      <div className="ticket-filter-buttons">

        <button
          className={
            statusFilter === 'ALL'
              ? 'active'
              : ''
          }
          onClick={
            () =>
              setStatusFilter('ALL')
          }
        >
          ALL
        </button>


        <button
          className={
            statusFilter === 'RESERVED'
              ? 'active'
              : ''
          }
          onClick={
            () =>
              setStatusFilter(
                'RESERVED'
              )
          }
        >
          RESERVED
        </button>


        <button
          className={
            statusFilter === 'CANCELLED'
              ? 'active'
              : ''
          }
          onClick={
            () =>
              setStatusFilter(
                'CANCELLED'
              )
          }
        >
          CANCELLED
        </button>

      </div>


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
            Loading your tickets...
          </p>
        )
      }


      {
        !loading &&
        filteredTickets.length === 0 && (

          <p className="empty-message">
            No tickets found for this filter.
          </p>

        )
      }


      {
        !loading &&
        filteredTickets.length > 0 && (

          <div className="tickets-list">

            {
              filteredTickets.map(
                (ticket) => {

                  const tournament =
                    ticket.tournament;


                  return (

                    <div
                      className="ticket-card"
                      key={ticket._id}
                    >

                      <p className="small-title">

                        {
                          tournament?.game ||
                          'CYBERARENA EVENT'
                        }

                      </p>


                      <h2>

                        {
                          tournament?.title ||
                          'Tournament'
                        }

                      </h2>


                      <p>
                        <strong>
                          TICKET CODE:
                        </strong>{' '}
                        {ticket.ticketCode}
                      </p>


                      <p>

                        <strong>
                          DATE:
                        </strong>{' '}

                        {
                          tournament?.date

                            ? new Date(
                                tournament.date
                              ).toLocaleDateString()

                            : 'N/A'
                        }

                      </p>


                      <p>
                        <strong>
                          PRICE:
                        </strong>{' '}
                        LKR {ticket.price}
                      </p>


                      <p
                        className={
                          ticket.status ===
                          'CANCELLED'

                            ? 'ticket-status cancelled'

                            : 'ticket-status'
                        }
                      >
                        {ticket.status}
                      </p>


                      {
                        ticket.status === 'RESERVED'
                        &&

                        <button
                          className="cancel-ticket-button"
                          disabled={
                            cancellingId ===
                            ticket._id
                          }
                          onClick={
                            () =>
                              handleCancel(
                                ticket._id
                              )
                          }
                        >

                          {
                            cancellingId === ticket._id
                              ? 'CANCELLING...'
                              : 'CANCEL TICKET'
                          }

                        </button>
                      }

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


export default MyTickets;