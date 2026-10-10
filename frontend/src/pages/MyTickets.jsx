import {
  useEffect,
  useState
} from 'react';

import api
  from '../api/axios';


function MyTickets() {

  const [
    tickets,
    setTickets
  ] = useState([]);


  const [
    loading,
    setLoading
  ] = useState(true);


  const [
    error,
    setError
  ] = useState('');


  const [
    message,
    setMessage
  ] = useState('');


  const [
    cancellingId,
    setCancellingId
  ] = useState(null);


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
          response.data.tickets
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


  const handleCancel =
    async (ticketId) => {

      const confirmCancel =
        window.confirm(
          'Are you sure you want to cancel this ticket?'
        );


      if (!confirmCancel) {

        return;

      }


      try {

        setCancellingId(
          ticketId
        );

        setError('');
        setMessage('');


        const response =
          await api.patch(
            `/tickets/cancel/${ticketId}`
          );


        setMessage(
          response.data.message
        );


        setTickets(
          (currentTickets) =>
            currentTickets.map(
              (ticket) => {

                if (
                  ticket._id ===
                  ticketId
                ) {

                  return {
                    ...ticket,
                    status:
                      'CANCELLED'
                  };

                }


                return ticket;

              }
            )
        );


      } catch (error) {

        setError(
          error.response?.data?.message ||
          'Unable to cancel ticket.'
        );


      } finally {

        setCancellingId(
          null
        );

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


      {
        message && (

          <p className="success-message">
            {message}
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
        loading && (

          <p className="loading-message">
            Loading your tickets...
          </p>

        )
      }


      {
        !loading &&
        tickets.length === 0 && (

          <p className="empty-message">

            You have not reserved any
            tournament tickets yet.

          </p>

        )
      }


      {
        !loading &&
        tickets.length > 0 && (

          <div className="tickets-list">

            {
              tickets.map(
                (ticket) => {

                  const tournament =
                    ticket.tournament;


                  const formattedDate =
                    tournament?.date
                      ? new Date(
                          tournament.date
                        ).toLocaleDateString(
                          'en-US',
                          {
                            year:
                              'numeric',

                            month:
                              'short',

                            day:
                              'numeric'
                          }
                        )
                      : 'N/A';


                  return (

                    <div
                      className="ticket-card"
                      key={ticket._id}
                    >

                      <p className="small-title">

                        {
                          tournament?.game ||
                          'TOURNAMENT'
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
                          Ticket Code:
                        </strong>{' '}

                        {ticket.ticketCode}
                      </p>


                      <p>
                        <strong>
                          Date:
                        </strong>{' '}

                        {formattedDate}
                      </p>


                      <p>
                        <strong>
                          Price:
                        </strong>{' '}

                        LKR {ticket.price}
                      </p>


                      <p>
                        <strong>
                          Reserved:
                        </strong>{' '}

                        {
                          new Date(
                            ticket.reservedAt
                          ).toLocaleString()
                        }
                      </p>


                      <span
                        className={
                          ticket.status ===
                          'CANCELLED'
                            ? 'ticket-status cancelled'
                            : 'ticket-status'
                        }
                      >

                        {ticket.status}

                      </span>


                      {
                        ticket.status ===
                        'RESERVED' && (

                          <button
                            className="cancel-ticket-button"
                            onClick={
                              () =>
                                handleCancel(
                                  ticket._id
                                )
                            }
                            disabled={
                              cancellingId ===
                              ticket._id
                            }
                          >

                            {
                              cancellingId ===
                              ticket._id
                                ? 'CANCELLING...'
                                : 'CANCEL TICKET'
                            }

                          </button>

                        )
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