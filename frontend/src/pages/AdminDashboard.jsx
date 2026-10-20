import {
  useEffect,
  useState
} from 'react';

import api
  from '../api/axios';


const emptyForm = {

  title: '',

  game: '',

  description: '',

  date: '',

  price: '',

  totalSeats: ''

};


function AdminDashboard() {

  const [
    tournaments,
    setTournaments
  ] = useState([]);


  const [
    form,
    setForm
  ] = useState(
    emptyForm
  );


  const [
    editingId,
    setEditingId
  ] = useState(null);


  const [
    loading,
    setLoading
  ] = useState(true);


  const [
    saving,
    setSaving
  ] = useState(false);


  const [
    error,
    setError
  ] = useState('');


  const [
    message,
    setMessage
  ] = useState('');


  // =====================================================
  // LOAD TOURNAMENTS
  // =====================================================

  const fetchTournaments =
    async () => {

      try {

        setLoading(true);
        setError('');


        const response =
          await api.get(
            '/tournaments'
          );


        setTournaments(
          response.data.tournaments
        );


      } catch (error) {

        setError(
          error.response?.data?.message ||
          'Unable to load tournaments.'
        );


      } finally {

        setLoading(false);

      }

    };


  useEffect(() => {

    fetchTournaments();

  }, []);


  // =====================================================
  // FORM INPUT
  // =====================================================

  const handleChange =
    (event) => {

      const {
        name,
        value
      } = event.target;


      setForm(
        (current) => ({

          ...current,

          [name]:
            value

        })
      );

    };


  // =====================================================
  // CREATE / UPDATE
  // =====================================================

  const handleSubmit =
    async (event) => {

      event.preventDefault();


      setError('');
      setMessage('');


      if (
        !form.title ||
        !form.game ||
        !form.description ||
        !form.date ||
        form.price === '' ||
        form.totalSeats === ''
      ) {

        setError(
          'Please complete all tournament fields.'
        );

        return;

      }


      try {

        setSaving(true);


        const data = {

          ...form,

          price:
            Number(
              form.price
            ),

          totalSeats:
            Number(
              form.totalSeats
            )

        };


        if (editingId) {

          const response =
            await api.patch(
              `/admin/tournaments/${editingId}`,
              data
            );


          setMessage(
            response.data.message
          );


        } else {

          const response =
            await api.post(
              '/admin/tournaments',
              data
            );


          setMessage(
            response.data.message
          );

        }


        setForm(
          emptyForm
        );


        setEditingId(
          null
        );


        await fetchTournaments();


      } catch (error) {

        setError(
          error.response?.data?.message ||
          'Unable to save tournament.'
        );


      } finally {

        setSaving(false);

      }

    };


  // =====================================================
  // EDIT
  // =====================================================

  const handleEdit =
    (tournament) => {

      setError('');
      setMessage('');


      setEditingId(
        tournament._id
      );


      setForm({

        title:
          tournament.title,

        game:
          tournament.game,

        description:
          tournament.description,

        date:
          new Date(
            tournament.date
          )
            .toISOString()
            .split('T')[0],

        price:
          tournament.price,

        totalSeats:
          tournament.totalSeats

      });


      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });

    };


  // =====================================================
  // CANCEL EDIT
  // =====================================================

  const handleCancelEdit =
    () => {

      setEditingId(
        null
      );


      setForm(
        emptyForm
      );


      setError('');
      setMessage('');

    };


  // =====================================================
  // DELETE
  // =====================================================

  const handleDelete =
    async (
      tournamentId
    ) => {

      const confirmed =
        window.confirm(
          'Are you sure you want to delete this tournament?'
        );


      if (!confirmed) {
        return;
      }


      try {

        setError('');
        setMessage('');


        const response =
          await api.delete(
            `/admin/tournaments/${tournamentId}`
          );


        setMessage(
          response.data.message
        );


        await fetchTournaments();


      } catch (error) {

        setError(
          error.response?.data?.message ||
          'Unable to delete tournament.'
        );

      }

    };


  return (

    <div className="admin-page">

      <div className="admin-header">

        <p className="small-title">
          CYBERARENA CONTROL CENTER
        </p>


        <h1>
          ADMIN DASHBOARD
        </h1>


        <p className="page-description">

          Create, update and manage
          CyberArena tournament events.

        </p>

      </div>


      {/* FORM */}

      <div className="admin-form-card">

        <h2>

          {
            editingId
              ? 'EDIT TOURNAMENT'
              : 'CREATE TOURNAMENT'
          }

        </h2>


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


        <form
          onSubmit={
            handleSubmit
          }
        >

          <label>
            Tournament Title
          </label>

          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="CyberArena Masters"
          />


          <label>
            Game
          </label>

          <input
            type="text"
            name="game"
            value={form.game}
            onChange={handleChange}
            placeholder="Counter-Strike 2"
          />


          <label>
            Description
          </label>

          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Tournament description..."
            rows="5"
          />


          <div className="admin-form-grid">

            <div>

              <label>
                Date
              </label>

              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
              />

            </div>


            <div>

              <label>
                Price (LKR)
              </label>

              <input
                type="number"
                name="price"
                min="0"
                value={form.price}
                onChange={handleChange}
                placeholder="1500"
              />

            </div>


            <div>

              <label>
                Total Seats
              </label>

              <input
                type="number"
                name="totalSeats"
                min="1"
                value={form.totalSeats}
                onChange={handleChange}
                placeholder="100"
              />

            </div>

          </div>


          <div className="admin-form-actions">

            <button
              type="submit"
              className="admin-save-button"
              disabled={saving}
            >

              {
                saving
                  ? 'SAVING...'
                  : editingId
                    ? 'UPDATE TOURNAMENT'
                    : 'CREATE TOURNAMENT'
              }

            </button>


            {
              editingId && (

                <button
                  type="button"
                  className="admin-cancel-button"
                  onClick={
                    handleCancelEdit
                  }
                >

                  CANCEL EDIT

                </button>

              )
            }

          </div>

        </form>

      </div>


      {/* TOURNAMENT LIST */}

      <div className="admin-tournament-section">

        <h2>
          MANAGE TOURNAMENTS
        </h2>


        {
          loading && (

            <p className="loading-message">

              Loading tournaments...

            </p>

          )
        }


        {
          !loading &&
          tournaments.length === 0 && (

            <p className="empty-message">

              No tournaments are available.

            </p>

          )
        }


        {
          !loading &&
          tournaments.length > 0 && (

            <div className="admin-tournament-grid">

              {
                tournaments.map(
                  (tournament) => (

                    <div
                      className="admin-tournament-card"
                      key={
                        tournament._id
                      }
                    >

                      <p className="small-title">

                        {
                          tournament.game
                        }

                      </p>


                      <h3>

                        {
                          tournament.title
                        }

                      </h3>


                      <p>

                        {
                          tournament.description
                        }

                      </p>


                      <div className="admin-tournament-info">

                        <p>

                          <strong>
                            Date:
                          </strong>{' '}

                          {
                            new Date(
                              tournament.date
                            )
                              .toLocaleDateString()
                          }

                        </p>


                        <p>

                          <strong>
                            Price:
                          </strong>{' '}

                          LKR {
                            tournament.price
                          }

                        </p>


                        <p>

                          <strong>
                            Seats:
                          </strong>{' '}

                          {
                            tournament.availableSeats
                          }

                          {' / '}

                          {
                            tournament.totalSeats
                          }

                        </p>

                      </div>


                      <div className="admin-card-actions">

                        <button
                          className="admin-edit-button"
                          onClick={
                            () =>
                              handleEdit(
                                tournament
                              )
                          }
                        >

                          EDIT

                        </button>


                        <button
                          className="admin-delete-button"
                          onClick={
                            () =>
                              handleDelete(
                                tournament._id
                              )
                          }
                        >

                          DELETE

                        </button>

                      </div>

                    </div>

                  )
                )
              }

            </div>

          )
        }

      </div>

    </div>

  );

}


export default AdminDashboard;