import { Link } from 'react-router-dom';

import FeatureCard from '../components/FeatureCard';

function Home() {
  return (
    <div className="home">

      <section className="hero">

        <p className="small-title">
          CYBERARENA NETWORK
        </p>

        <h1>
          WELCOME PLAYER
        </h1>

        <p className="hero-description">
          Enter the competitive gaming network.
          Discover eSports tournaments, reserve
          tickets and follow player rankings.
        </p>

        <Link
          to="/tournaments"
          className="main-button"
        >
          EXPLORE TOURNAMENTS
        </Link>

      </section>


      <section className="features">

        <FeatureCard
          title="TOURNAMENTS"
          description="Discover upcoming competitive gaming events."
        />

        <FeatureCard
          title="TICKETS"
          description="Reserve and manage your tournament tickets."
        />

        <FeatureCard
          title="LEADERBOARD"
          description="Follow rankings of competitive players."
        />

      </section>

    </div>
  );
}

export default Home;