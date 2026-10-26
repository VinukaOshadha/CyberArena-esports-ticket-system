import {
  Link
} from 'react-router-dom';


function Home() {

  return (

    <main className="cyber-home">

      {/* =========================
          BACKGROUND IMAGE
          ========================= */}

      <div className="cyber-home-background" />

      <div className="cyber-home-overlay" />


      {/* =========================
          HOME CONTENT
          ========================= */}

      <div className="cyber-home-content">

        {/* HERO */}

        <section className="cyber-hero">

          <p className="cyber-hero-tag">

            ENTER THE ARENA

          </p>


          <h1>

            PLAY.

            <br />

            COMPETE.

            <br />

            <span>
              DOMINATE.
            </span>

          </h1>


          <p className="cyber-hero-description">

            Discover competitive
            eSports tournaments,
            reserve your tickets,
            track your events and
            enter the CyberArena.

          </p>


          <div className="cyber-hero-actions">

            <Link
              to="/tournaments"
              className="cyber-primary-button"
            >

              EXPLORE TOURNAMENTS

            </Link>


            <Link
              to="/leaderboard"
              className="cyber-secondary-button"
            >

              VIEW LEADERBOARD

            </Link>

          </div>

        </section>


        {/* =========================
            FEATURE CARDS
            ========================= */}

        <section className="cyber-home-features">

          <div className="cyber-home-feature-card">

            <p className="feature-number">
              01
            </p>


            <h2>
              TOURNAMENTS
            </h2>


            <p>

              Discover competitive
              Valorant, Counter-Strike 2
              and League of Legends
              tournaments.

            </p>


            <Link
              to="/tournaments"
              className="feature-link"
            >
              EXPLORE →
            </Link>

          </div>


          <div className="cyber-home-feature-card">

            <p className="feature-number">
              02
            </p>


            <h2>
              MY TICKETS
            </h2>


            <p>

              Reserve tournament
              tickets and manage
              your active and
              cancelled reservations.

            </p>


            <Link
              to="/my-tickets"
              className="feature-link"
            >
              VIEW TICKETS →
            </Link>

          </div>


          <div className="cyber-home-feature-card">

            <p className="feature-number">
              03
            </p>


            <h2>
              LEADERBOARD
            </h2>


            <p>

              Follow CyberArena
              rankings, player
              points and tournament
              victories.

            </p>


            <Link
              to="/leaderboard"
              className="feature-link"
            >
              VIEW RANKINGS →
            </Link>

          </div>

        </section>

      </div>

    </main>

  );

}


export default Home;