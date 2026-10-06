import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import api from '../api/axios';


function Login() {

  const [email, setEmail] =
    useState('');

  const [password, setPassword] =
    useState('');

  const [error, setError] =
    useState('');

  const [message, setMessage] =
    useState('');

  const [loading, setLoading] =
    useState(false);


  const navigate =
    useNavigate();


  const handleSubmit =
    async (event) => {

      event.preventDefault();

      setError('');
      setMessage('');


      // Check empty fields
      if (!email || !password) {

        setError(
          'Please enter email and password.'
        );

        return;
      }


      // Check email
      if (!email.includes('@')) {

        setError(
          'Please enter a valid email address.'
        );

        return;
      }


      // Check password length
      if (password.length < 6) {

        setError(
          'Password must contain at least 6 characters.'
        );

        return;
      }


      try {

        setLoading(true);


        // Send login request to backend
        const response =
          await api.post(
            '/auth/login',
            {
              email,
              password
            }
          );


        // Save user and token
        localStorage.setItem(
          'userInfo',
          JSON.stringify({
            user: response.data.user,
            token: response.data.token
          })
        );


        setMessage(
          response.data.message ||
          'Login successful.'
        );


        // Clear form
        setEmail('');
        setPassword('');


        // Go to Home page
        setTimeout(() => {

          navigate('/');

        }, 1200);


      } catch (error) {

        setError(
          error.response?.data?.message ||
          'Login failed. Please try again.'
        );

      } finally {

        setLoading(false);

      }

    };


  return (
    <div className="auth-page">

      <div className="auth-card">

        <p className="small-title">
          PLAYER ACCESS
        </p>

        <h1>
          LOGIN
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
            disabled={loading}
          >

            {
              loading
                ? 'LOGGING IN...'
                : 'LOGIN'
            }

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