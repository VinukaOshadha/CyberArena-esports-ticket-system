import { useState } from 'react';
import { Link } from 'react-router-dom';

function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');


  const handleSubmit = (event) => {

    event.preventDefault();

    setMessage('');
    setError('');


    if (!email || !password) {

      setError(
        'Please enter both email and password.'
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


    setMessage(
      'Frontend validation successful. Backend login will be connected later.'
    );

  };


  return (
    <div className="auth-page">

      <div className="auth-card">

        <p className="small-title">
          PLAYER ACCESS
        </p>

        <h1>LOGIN</h1>


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
            placeholder="Enter password"
            value={password}
            onChange={
              (event) =>
                setPassword(event.target.value)
            }
          />


          <button
            type="submit"
            className="auth-submit"
          >
            LOGIN
          </button>

        </form>


        <p className="auth-link">

          New player?{' '}

          <Link to="/register">
            Create Account
          </Link>

        </p>

      </div>

    </div>
  );
}

export default Login;