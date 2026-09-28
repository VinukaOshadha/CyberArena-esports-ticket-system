import { useState } from 'react';

function Support() {

  const [name, setName] =
    useState('');

  const [email, setEmail] =
    useState('');

  const [message, setMessage] =
    useState('');


  const handleSubmit = (event) => {

    event.preventDefault();

    alert(
      'Support backend will be connected later.'
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
            required
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
            required
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
            required
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