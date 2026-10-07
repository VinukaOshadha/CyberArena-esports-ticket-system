import {
  useContext
} from 'react';

import {
  Navigate,
  useLocation
} from 'react-router-dom';

import {
  AuthContext
} from '../context/AuthContext';


function ProtectedRoute({
  children
}) {

  const {
    userInfo
  } = useContext(
    AuthContext
  );


  const location =
    useLocation();


  if (!userInfo) {

    return (

      <Navigate
        to="/login"
        replace
        state={{
          from: location.pathname
        }}
      />

    );

  }


  return children;

}


export default ProtectedRoute;