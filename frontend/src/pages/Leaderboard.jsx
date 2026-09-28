function Leaderboard() {

  const players = [
    {
      rank: 1,
      name: 'ShadowX',
      points: 9850,
      wins: 32
    },
    {
      rank: 2,
      name: 'CyberWolf',
      points: 9100,
      wins: 29
    },
    {
      rank: 3,
      name: 'NovaStrike',
      points: 8750,
      wins: 25
    },
    {
      rank: 4,
      name: 'DarkPhoenix',
      points: 8200,
      wins: 22
    },
    {
      rank: 5,
      name: 'PixelHunter',
      points: 7900,
      wins: 20
    }
  ];

  return (
    <div className="leaderboard-page">

      <p className="small-title">
        PLAYER RANKINGS
      </p>

      <h1>
        LEADERBOARD
      </h1>

      <div className="leaderboard-table">

        <div className="leaderboard-row header">

          <span>RANK</span>
          <span>PLAYER</span>
          <span>POINTS</span>
          <span>WINS</span>

        </div>

        {players.map((player) => (

          <div
            className="leaderboard-row"
            key={player.rank}
          >

            <span>
              #{player.rank}
            </span>

            <span>
              {player.name}
            </span>

            <span>
              {player.points}
            </span>

            <span>
              {player.wins}
            </span>

          </div>

        ))}

      </div>

    </div>
  );
}

export default Leaderboard;