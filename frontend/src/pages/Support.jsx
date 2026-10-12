import {
  useState
} from 'react';

import api
  from '../api/axios';


function Support() {

  const [
    name,
    setName
  ] = useState('');


  const [
    email,
    setEmail
  ] = useState('');


  const [
    message,
    setMessage
  ] = useState('');


  const [
    error,
    setError
  ] = useState('');


  const [
    success,
    setSuccess
  ] = useState('');


  const [
    loading,
    setLoading
  ] = useState(false);


  const handleSubmit =
    async (event) => {

      event.preventDefault();

      setError('');
      setSuccess('');


      if (
        !name ||
        !email ||
        !message
      ) {

        setError(
          'Please complete all fields.'
        );

        return;

      }


      if (
        name.trim().length < 3
      ) {

        setError(
          'Name must contain at least 3 characters.'
        );

        return;

      }


      if (
        !email.includes('@')
      ) {

        setError(
          'Please enter a valid email address.'
        );

        return;

      }


      if (
        message.trim().length < 10
      ) {

        setError(
          'Message must contain at least 10 characters.'
        );

        return;

      }


      try {

        setLoading(true);


        const response =
          await api.post(
            '/support',
            {
              name,
              email,
              message
            }
          );


        setSuccess(
          response.data.message
        );


        setName('');
        setEmail('');
        setMessage('');


      } catch (error) {

        setError(
          error.response?.data?.message ||
          'Unable to submit support message.'
        );


      } finally {

        setLoading(false);

      }

    };


  return (

    <div className="support-page">

      <div className="support-card">

        <p className="small-title">
          PLAYER SUPPORT
        </p>


        <h1>
          SUPPORT
        </h1>


        <p>

          Need assistance with tournaments,
          tickets, accounts or CyberArena?

          Send us a message below.

        </p>


        {
          error && (

            <p className="error-message">
              {error}
            </p>

          )
        }


        {
          success && (

            <p className="success-message">
              {success}
            </p>

          )
        }


        <form onSubmit={handleSubmit}>

          <label>
            Name
          </label>

          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={
              (event) =>
                setName(
                  event.target.value
                )
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
                setEmail(
                  event.target.value
                )
            }
          />


          <label>
            Message
          </label>

          <textarea
            placeholder="Describe your issue..."
            rows="6"
            value={message}
            onChange={
              (event) =>
                setMessage(
                  event.target.value
                )
            }
          />


          <button
            type="submit"
            disabled={loading}
          >

            {
              loading
                ? 'SENDING...'
                : 'SEND MESSAGE'
            }

          </button>

        </form>

      </div>

    </div>

  );

}


export default Support;