import { createContext } from "react";
import { useState, useEffect  } from 'react';
import { register, login, logout, fetchUserData } from '../services/auth.service';
import { useMemo, useCallback } from 'react';

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const [userData, setUserData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const signUp = useCallback(async (userData) => {
        setIsLoading(true);
        setError(null);

        try {
            const data = await register(userData);
            setUserData(data);
            return data;
        } catch (err) {
            setError(err.errors || { general: 'Failed to register user.' });
        } finally {
            setIsLoading(false);
        }
    }, []);

    const signIn = useCallback(async (userData) => {
        setIsLoading(true);
        setError(null);

        try {
            const data = await login(userData);
            setUserData(data);
            return data;
        } catch (err) {
            console.log('Login failed with error:', err);
            setError(err.errors || { general: 'Failed to login user.' });
        } finally {
            setIsLoading(false);
        }
    }, []);

    const signOut = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            await logout();
            setUserData(null);
        } catch (err) {
            setError('Failed to logout user.');
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, []);

    const fetchUser = useCallback(async () => {
        // setIsLoading(true);
        setError(null);
        try {
            const data = await fetchUserData();
            setUserData(data);
            return data;
        } catch (err) {
            console.error('Failed to fetch user data:');
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            await fetchUser();
            setIsLoading(false);
        };
        fetchData();
    }, [fetchUser]);

    const contextValue = useMemo(() => ({
        userData,
        isLoading,
        error,
        setError,
        signUp,
        signIn,
        signOut,
        fetchUser,
        setIsLoading,
    }), [userData, isLoading, error, signUp, signIn, signOut, fetchUser]);

    return (
        <AuthContext value={contextValue}>
            {children}
        </AuthContext>
    );
}

export { AuthContext, AuthProvider };