import { Link } from 'react-router-dom';


function NotFound() {

  return (

    <div className="not-found-page">

      <div className="not-found-card">

        <p className="small-title">
          SYSTEM ERROR
        </p>


        <h1>
          404
        </h1>


        <h2>
          PAGE NOT FOUND
        </h2>


        <p className="not-found-description">

          The CyberArena page you are trying
          to access does not exist or may
          have been moved.

        </p>


        <Link
          to="/"
          className="main-button"
        >
          BACK TO HOME
        </Link>

      </div>

    </div>

  );

}


export default NotFound;