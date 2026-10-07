import axios from 'axios';


const api = axios.create({

  baseURL:
    'http://localhost:5000/api'

});


// Automatically add JWT token
// to protected API requests
api.interceptors.request.use(

  (config) => {

    try {

      const storedUser =
        localStorage.getItem(
          'userInfo'
        );


      if (storedUser) {

        const userInfo =
          JSON.parse(storedUser);


        if (userInfo.token) {

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

  (error) => {

    return Promise.reject(error);

  }

);


export default api;