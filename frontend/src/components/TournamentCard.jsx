import { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import api from '../api/axios';


function TournamentCard({ tournament, onReserved }) {

  const [message, setMessage] =
    useState('');

  const [error, setError] =
    useState('');

  const [loading, setLoading] =
    useState(false);


  const navigate =
    useNavigate();


  const formattedDate =
    new Date(
      tournament.date
    ).toLocaleDateString(
      'en-US',
      {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      }
    );


  const handleReserve =
    async () => {

      setMessage('');
      setError('');


      const storedUser =
        localStorage.getItem(
          'userInfo'
        );


      if (!storedUser) {

        navigate('/login');

        return;

      }


      try {

        setLoading(true);


        const response =
          await api.post(
            `/tickets/reserve/${tournament._id}`
          );


        setMessage(
          response.data.message
        );


        if (onReserved) {

          onReserved(
            tournament._id
          );

        }


      } catch (error) {

        setError(
          error.response?.data?.message ||
          'Ticket reservation failed.'
        );


      } finally {

        setLoading(false);

      }

    };


  return (

    <div className="tournament-card">

      <p className="small-title">
        {tournament.game}
      </p>


      <h2>
        {tournament.title}
      </h2>


      <p className="tournament-description">
        {tournament.description}
      </p>


      <div className="tournament-info">

        <p>
          <strong>Date:</strong>{' '}
          {formattedDate}
        </p>


        <p>
          <strong>Price:</strong>{' '}
          LKR {tournament.price}
        </p>


        <p>
          <strong>
            Available Seats:
          </strong>{' '}
          {tournament.availableSeats}
          {' / '}
          {tournament.totalSeats}
        </p>

      </div>


      {
        error && (

          <p className="error-message">
            {error}
          </p>

        )
      }


      {
        message && (

          <p className="success-message">
            {message}
          </p>

        )
      }


      <button
        onClick={handleReserve}
        disabled={
          loading ||
          tournament.availableSeats <= 0
        }
      >

        {
          loading
            ? 'RESERVING...'
            : tournament.availableSeats <= 0
              ? 'SOLD OUT'
              : 'RESERVE TICKET'
        }

      </button>

    </div>

  );

}


export default TournamentCard;