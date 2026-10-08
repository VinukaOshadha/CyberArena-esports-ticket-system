function TournamentCard({ tournament }) {

  const formattedDate =
    new Date(
      tournament.date
    ).toLocaleDateString(
      'en-US',
      {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      }
    );


  const handleReserve = () => {

    alert(
      `Ticket reservation for ${tournament.title} will be connected soon.`
    );

  };


  return (

    <div className="tournament-card">

      <p className="small-title">
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
          <strong>Date:</strong>{' '}
          {formattedDate}
        </p>

        <p>
          <strong>Price:</strong>{' '}
          LKR {tournament.price}
        </p>

        <p>
          <strong>
            Available Seats:
          </strong>{' '}
          {tournament.availableSeats}
          {' / '}
          {tournament.totalSeats}
        </p>

      </div>


      <button onClick={handleReserve}>
        RESERVE TICKET
      </button>

    </div>

  );

}


export default TournamentCard;