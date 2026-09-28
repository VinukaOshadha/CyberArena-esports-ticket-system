function MyTickets() {

  const tickets = [

    {
      id: 1,
      tournament: 'Cyber Strike Championship',
      game: 'Valorant',
      date: 'October 15, 2026',
      ticketCode: 'CA-VAL-001',
      status: 'Confirmed'
    }

  ];

  return (
    <div className="tickets-page">

      <p className="small-title">
        PLAYER TICKETS
      </p>

      <h1>
        MY TICKETS
      </h1>

      <div className="tickets-list">

        {tickets.map(
          (ticket) => (

            <div
              className="ticket-card"
              key={ticket.id}
            >

              <h2>
                {ticket.tournament}
              </h2>

              <p>
                Game: {ticket.game}
              </p>

              <p>
                Date: {ticket.date}
              </p>

              <p>
                Ticket ID: {ticket.ticketCode}
              </p>

              <p className="ticket-status">
                {ticket.status}
              </p>

            </div>

          )
        )}

      </div>

    </div>
  );
}

export default MyTickets;