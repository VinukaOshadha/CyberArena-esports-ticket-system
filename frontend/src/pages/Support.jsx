import { useState } from 'react';

function Support() {

  const [name, setName] =
    useState('');

  const [email, setEmail] =
    useState('');

  const [message, setMessage] =
    useState('');

  const [error, setError] =
    useState('');

  const [success, setSuccess] =
    useState('');


  const handleSubmit = (event) => {

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


    if (!email.includes('@')) {

      setError(
        'Please enter a valid email address.'
      );

      return;
    }


    if (message.length < 10) {

      setError(
        'Message must contain at least 10 characters.'
      );

      return;
    }


    setSuccess(
      'Message validated successfully. Backend support service will be connected later.'
    );


    setName('');
    setEmail('');
    setMessage('');

  };


  return (
    <div className="support-page">

      <div className="support-card">

        <p className="small-title">
          PLAYER SUPPORT
        </p>

        <h1>
          CONTACT SUPPORT
        </h1>

        <p>
          Need help with CyberArena?
          Send us a message.
        </p>


        {error && (
          <p className="error-message">
            {error}
          </p>
        )}


        {success && (
          <p className="success-message">
            {success}
          </p>
        )}


        <form onSubmit={handleSubmit}>

          <label>
            Name
          </label>

          <input
            type="text"
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
            value={email}
            onChange={
              (event) =>
                setEmail(event.target.value)
            }
          />


          <label>
            Message
          </label>

          <textarea
            rows="6"
            value={message}
            onChange={
              (event) =>
                setMessage(event.target.value)
            }
          />


          <button type="submit">
            SEND MESSAGE
          </button>

        </form>

      </div>

    </div>
  );
}

export default Support;