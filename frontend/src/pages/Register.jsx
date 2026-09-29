import { useState } from 'react';
import { Link } from 'react-router-dom';

function Register() {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] =
    useState('');

  const [error, setError] = useState('');
  const [message, setMessage] = useState('');


  const handleSubmit = (event) => {

    event.preventDefault();

    setError('');
    setMessage('');


    if (
      !name ||
      !email ||
      !password ||
      !confirmPassword
    ) {

      setError(
        'Please complete all fields.'
      );

      return;
    }


    if (name.length < 3) {

      setError(
        'Player name must contain at least 3 characters.'
      );

      return;
    }


    if (!email.includes('@')) {

      setError(
        'Please enter a valid email address.'
      );

      return;
    }


    if (password.length < 6) {

      setError(
        'Password must contain at least 6 characters.'
      );

      return;
    }


    if (password !== confirmPassword) {

      setError(
        'Passwords do not match.'
      );

      return;
    }


    setMessage(
      'Registration validation successful. Backend registration will be connected later.'
    );

  };


  return (
    <div className="auth-page">

      <div className="auth-card">

        <p className="small-title">
          JOIN THE NETWORK
        </p>

        <h1>
          REGISTER
        </h1>


        {error && (
          <p className="error-message">
            {error}
          </p>
        )}


        {message && (
          <p className="success-message">
            {message}
          </p>
        )}


        <form onSubmit={handleSubmit}>

          <label>
            Player Name
          </label>

          <input
            type="text"
            placeholder="Enter player name"
            value={name}
            onChange={
              (event) =>
                setName(event.target.value)
            }
          />


          <label>
            Email
          </label>

          <input
            type="email"
            placeholder="player@email.com"
            value={email}
            onChange={
              (event) =>
                setEmail(event.target.value)
            }
          />


          <label>
            Password
          </label>

          <input
            type="password"
            placeholder="Minimum 6 characters"
            value={password}
            onChange={
              (event) =>
                setPassword(event.target.value)
            }
          />


          <label>
            Confirm Password
          </label>

          <input
            type="password"
            placeholder="Re-enter password"
            value={confirmPassword}
            onChange={
              (event) =>
                setConfirmPassword(
                  event.target.value
                )
            }
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