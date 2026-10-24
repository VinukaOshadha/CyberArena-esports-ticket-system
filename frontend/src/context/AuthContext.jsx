import {
  createContext,
  useEffect,
  useState
} from 'react';


export const AuthContext =
  createContext();


const getStoredUser =
  () => {

    try {

      const storedUser =
        localStorage.getItem(
          'userInfo'
        );


      return storedUser
        ? JSON.parse(storedUser)
        : null;


    } catch {

      localStorage.removeItem(
        'userInfo'
      );

      return null;

    }

  };


export function AuthProvider({
  children
}) {

  const [
    userInfo,
    setUserInfo
  ] = useState(
    getStoredUser
  );


  const login =
    (data) => {

      localStorage.setItem(
        'userInfo',
        JSON.stringify(data)
      );


      setUserInfo(
        data
      );

    };


  const logout =
    () => {

      localStorage.removeItem(
        'userInfo'
      );


      setUserInfo(
        null
      );

    };


  // =====================================================
  // HANDLE EXPIRED / INVALID SESSION
  // =====================================================

  useEffect(() => {

    const handleExpiredSession =
      () => {

        setUserInfo(
          null
        );

      };


    window.addEventListener(
      'cyberarena-auth-expired',
      handleExpiredSession
    );


    return () => {

      window.removeEventListener(
        'cyberarena-auth-expired',
        handleExpiredSession
      );

    };

  }, []);


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