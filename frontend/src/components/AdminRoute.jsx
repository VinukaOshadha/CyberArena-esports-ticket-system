import {
  useContext
} from 'react';

import {
  Navigate
} from 'react-router-dom';

import {
  AuthContext
} from '../context/AuthContext';


function AdminRoute({
  children
}) {

  const {
    userInfo
  } = useContext(
    AuthContext
  );


  if (!userInfo) {

    return (
      <Navigate
        to="/login"
        replace
      />
    );

  }


  if (
    userInfo.user?.role !==
    'ADMIN'
  ) {

    return (
      <Navigate
        to="/"
        replace
      />
    );

  }


  return children;

}


export default AdminRoute;