import { useState, useEffect } from 'react';
import { register, login, logout } from '../services/auth.service';

export const useUser = () => {
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const signUp = async (userData) => {
    setIsLoading(true);
    setError(null);

    try {
        const data = await register(userData);
        setUserData(data);
        return data;
    } catch (err) {
        setError('Failed to register user.');
    } finally {
        setIsLoading(false);
    }
}

const signIn = async (userData) => {
    setIsLoading(true);
    setError(null);

    try {
        const data = await login(userData);
        setUserData(data);
        return data;
    } catch (err) {
        setError('Failed to login user.');
    } finally {
        setIsLoading(false);
    }
}

const signOut = async () => {
    setIsLoading(true);
    setError(null);
    try {
        await logout();
        setUserData(null);
    } catch (err) {
        setError('Failed to logout user.');
    } finally {
        setIsLoading(false);
    }
}

//   useEffect(() => {
//     const fetchData = async () => {
//       setIsLoading(true);
//       setError(null);

//       try {
//         const data = await fetchUserData();
//         setUserData(data);
//       } catch (err) {
//         setError('Failed to fetch user data.');
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

  return { userData, isLoading, error, setError, signUp, signIn, signOut };
}

export default useUser;