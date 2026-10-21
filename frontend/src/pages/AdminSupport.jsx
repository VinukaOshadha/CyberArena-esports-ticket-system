import {
  useEffect,
  useMemo,
  useState
} from 'react';

import api from '../api/axios';


function AdminSupport() {

  const [messages, setMessages] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [updatingId, setUpdatingId] =
    useState(null);

  const [filter, setFilter] =
    useState('ALL');

  const [error, setError] =
    useState('');

  const [success, setSuccess] =
    useState('');


  // =====================================================
  // GET SUPPORT MESSAGES
  // =====================================================

  const fetchMessages =
    async () => {

      try {

        setLoading(true);

        setError('');


        const response =
          await api.get(
            '/admin/support'
          );


        setMessages(
          response.data.supportMessages
        );


      } catch (error) {

        console.error(
          'Admin support error:',
          error
        );


        setError(
          error.response?.data?.message ||
          'Unable to load support messages.'
        );


      } finally {

        setLoading(false);

      }

    };


  useEffect(() => {

    fetchMessages();

  }, []);


  // =====================================================
  // CHANGE MESSAGE STATUS
  // =====================================================

  const handleStatusChange =
    async (
      messageId,
      newStatus
    ) => {

      try {

        setUpdatingId(
          messageId
        );

        setError('');

        setSuccess('');


        const response =
          await api.patch(
            `/admin/support/${messageId}/status`,
            {
              status: newStatus
            }
          );


        setMessages(
          (currentMessages) =>
            currentMessages.map(
              (message) => {

                if (
                  message._id ===
                  messageId
                ) {

                  return {
                    ...message,
                    status: newStatus
                  };

                }


                return message;

              }
            )
        );


        setSuccess(
          response.data.message
        );


      } catch (error) {

        console.error(
          'Support status error:',
          error
        );


        setError(
          error.response?.data?.message ||
          'Unable to update support message.'
        );


      } finally {

        setUpdatingId(
          null
        );

      }

    };


  // =====================================================
  // STATISTICS
  // =====================================================

  const openCount =
    messages.filter(
      (message) =>
        message.status === 'OPEN'
    ).length;


  const resolvedCount =
    messages.filter(
      (message) =>
        message.status === 'RESOLVED'
    ).length;


  // =====================================================
  // FILTER
  // =====================================================

  const filteredMessages =
    useMemo(() => {

      if (
        filter === 'ALL'
      ) {

        return messages;

      }


      return messages.filter(
        (message) =>
          message.status === filter
      );

    }, [
      messages,
      filter
    ]);


  return (

    <div className="admin-support-page">

      <div className="admin-support-header">

        <p className="small-title">
          ADMIN CONTROL CENTER
        </p>


        <h1>
          SUPPORT INBOX
        </h1>


        <p className="page-description">
          Review player support requests
          and manage their current status.
        </p>

      </div>


      {/* STATISTICS */}

      <div className="support-admin-stats">

        <div className="support-admin-stat">

          <span>
            TOTAL
          </span>

          <strong>
            {messages.length}
          </strong>

        </div>


        <div className="support-admin-stat">

          <span>
            OPEN
          </span>

          <strong>
            {openCount}
          </strong>

        </div>


        <div className="support-admin-stat">

          <span>
            RESOLVED
          </span>

          <strong>
            {resolvedCount}
          </strong>

        </div>

      </div>


      {/* FILTER BUTTONS */}

      <div className="support-filter-buttons">

        <button
          className={
            filter === 'ALL'
              ? 'active'
              : ''
          }
          onClick={
            () =>
              setFilter('ALL')
          }
        >
          ALL
        </button>


        <button
          className={
            filter === 'OPEN'
              ? 'active'
              : ''
          }
          onClick={
            () =>
              setFilter('OPEN')
          }
        >
          OPEN
        </button>


        <button
          className={
            filter === 'RESOLVED'
              ? 'active'
              : ''
          }
          onClick={
            () =>
              setFilter('RESOLVED')
          }
        >
          RESOLVED
        </button>

      </div>


      {/* ERROR */}

      {
        error && (

          <p className="error-message">
            {error}
          </p>

        )
      }


      {/* SUCCESS */}

      {
        success && (

          <p className="success-message">
            {success}
          </p>

        )
      }


      {/* LOADING */}

      {
        loading && (

          <p className="loading-message">
            Loading support messages...
          </p>

        )
      }


      {/* EMPTY */}

      {
        !loading &&
        filteredMessages.length === 0 && (

          <p className="empty-message">
            No support messages found.
          </p>

        )
      }


      {/* SUPPORT MESSAGES */}

      {
        !loading &&
        filteredMessages.length > 0 && (

          <div className="support-admin-list">

            {
              filteredMessages.map(
                (message) => (

                  <div
                    className="support-admin-card"
                    key={message._id}
                  >

                    <div className="support-admin-card-header">

                      <div>

                        <h2>
                          {message.name}
                        </h2>

                        <p>
                          {message.email}
                        </p>

                      </div>


                      <span
                        className={
                          message.status ===
                          'RESOLVED'

                            ? 'support-status resolved'

                            : 'support-status open'
                        }
                      >

                        {message.status}

                      </span>

                    </div>


                    <div className="support-message-content">

                      {message.message}

                    </div>


                    <p className="support-created-date">

                      Submitted:{' '}

                      {
                        new Date(
                          message.createdAt
                        ).toLocaleString()
                      }

                    </p>


                    {
                      message.status ===
                      'OPEN'

                        ? (

                          <button
                            className="resolve-support-button"
                            disabled={
                              updatingId ===
                              message._id
                            }
                            onClick={
                              () =>
                                handleStatusChange(
                                  message._id,
                                  'RESOLVED'
                                )
                            }
                          >

                            {
                              updatingId ===
                              message._id

                                ? 'UPDATING...'

                                : 'MARK RESOLVED'
                            }

                          </button>

                        )

                        : (

                          <button
                            className="reopen-support-button"
                            disabled={
                              updatingId ===
                              message._id
                            }
                            onClick={
                              () =>
                                handleStatusChange(
                                  message._id,
                                  'OPEN'
                                )
                            }
                          >

                            {
                              updatingId ===
                              message._id

                                ? 'UPDATING...'

                                : 'REOPEN MESSAGE'
                            }

                          </button>

                        )
                    }

                  </div>

                )
              )
            }

          </div>

        )
      }

    </div>

  );

}


export default AdminSupport;