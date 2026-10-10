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


  useEffect(() => {

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

          console.error(
            'Ticket loading error:',
            error
          );


          setError(
            error.response?.data?.message ||
            'Unable to load your tickets.'
          );


        } finally {

          setLoading(false);

        }

      };


    fetchTickets();

  }, []);


  return (

    <div className="tickets-page">

      <p className="small-title">
        PLAYER RESERVATIONS
      </p>


      <h1>
        MY TICKETS
      </h1>


      {
        loading && (

          <p className="loading-message">
            Loading your tickets...
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
        tickets.length === 0 && (

          <p className="empty-message">

            You have not reserved any
            tournament tickets yet.

          </p>

        )
      }


      {
        !loading &&
        !error &&
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
                        className="ticket-status"
                      >

                        {ticket.status}

                      </span>

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