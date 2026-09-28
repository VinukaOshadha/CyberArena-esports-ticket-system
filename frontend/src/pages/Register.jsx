import { Link } from 'react-router-dom';

function Register() {

  const handleSubmit = (event) => {
    event.preventDefault();

    alert(
      'Backend registration will be connected later.'
    );
  };

  return (
    <div className="auth-page">

      <div className="auth-card">

        <p className="small-title">
          JOIN THE NETWORK
        </p>

        <h1>REGISTER</h1>

        <form onSubmit={handleSubmit}>

          <label>Player Name</label>

          <input
            type="text"
            placeholder="Enter player name"
            required
          />

          <label>Email</label>

          <input
            type="email"
            placeholder="player@email.com"
            required
          />

          <label>Password</label>

          <input
            type="password"
            placeholder="Minimum 6 characters"
            minLength="6"
            required
          />

          <button
            type="submit"
            className="auth-submit"
          >
            CREATE ACCOUNT
          </button>

        </form>

        <p className="auth-link">

          Already registered?{' '}

          <Link to="/login">
            Login
          </Link>

        </p>

      </div>

    </div>
  );
}

export default Register;