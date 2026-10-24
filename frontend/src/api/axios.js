import axios from 'axios';


const api = axios.create({

  baseURL:
    'http://localhost:5000/api'

});


// =====================================================
// REQUEST INTERCEPTOR
// Attach JWT to requests
// =====================================================

api.interceptors.request.use(

  (config) => {

    try {

      const storedUser =
        localStorage.getItem(
          'userInfo'
        );


      if (storedUser) {

        const userInfo =
          JSON.parse(
            storedUser
          );


        if (
          userInfo.token
        ) {

          config.headers.Authorization =
            `Bearer ${userInfo.token}`;

        }

      }


    } catch (error) {

      console.error(
        'Token loading error:',
        error
      );

    }


    return config;

  },


  (error) =>
    Promise.reject(error)

);


// =====================================================
// RESPONSE INTERCEPTOR
// Remove expired/invalid login
// =====================================================

api.interceptors.response.use(

  (response) =>
    response,


  (error) => {

    if (
      error.response?.status === 401
    ) {

      const hadUser =
        localStorage.getItem(
          'userInfo'
        );


      if (hadUser) {

        localStorage.removeItem(
          'userInfo'
        );


        window.dispatchEvent(
          new Event(
            'cyberarena-auth-expired'
          )
        );

      }

    }


    return Promise.reject(
      error
    );

  }

);


export default api;