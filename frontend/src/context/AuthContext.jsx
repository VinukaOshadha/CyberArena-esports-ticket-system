import {
  createContext,
  useState
} from 'react';


export const AuthContext =
  createContext();


const getStoredUser = () => {

  try {

    const storedUser =
      localStorage.getItem(
        'userInfo'
      );

    if (storedUser) {

      return JSON.parse(
        storedUser
      );

    }

    return null;

  } catch (error) {

    localStorage.removeItem(
      'userInfo'
    );

    return null;
  }

};


export function AuthProvider({
  children
}) {

  const [userInfo, setUserInfo] =
    useState(getStoredUser);


  const login = (data) => {

    localStorage.setItem(
      'userInfo',
      JSON.stringify(data)
    );

    setUserInfo(data);

  };


  const logout = () => {

    localStorage.removeItem(
      'userInfo'
    );

    setUserInfo(null);

  };


  return (

    <AuthContext.Provider
      value={{
        userInfo,
        login,
        logout
      }}
    >

      {children}

    </AuthContext.Provider>

  );

}