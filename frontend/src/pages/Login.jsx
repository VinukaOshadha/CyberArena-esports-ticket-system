import {
  useContext,
  useState
} from 'react';

import {
  Link,
  useNavigate
} from 'react-router-dom';

import api from '../api/axios';

import {
  AuthContext
} from '../context/AuthContext';


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


  const {
    login
  } = useContext(
    AuthContext
  );


  const handleSubmit =
    async (event) => {

      event.preventDefault();

      setError('');
      setMessage('');


      if (!email || !password) {

        setError(
          'Please enter email and password.'
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


      try {

        setLoading(true);


        const response =
          await api.post(
            '/auth/login',
            {
              email,
              password
            }
          );


        const loginData = {

          user:
            response.data.user,

          token:
            response.data.token

        };


        login(loginData);


        setMessage(
          response.data.message ||
          'Login successful.'
        );


        setEmail('');
        setPassword('');


        setTimeout(() => {

          navigate('/');

        }, 1000);


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
                setEmail(
                  event.target.value
                )
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
                setPassword(
                  event.target.value
                )
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