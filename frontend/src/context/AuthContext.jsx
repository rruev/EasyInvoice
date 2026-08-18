import { 
    createContext,
    useState,
    useEffect,
    useCallback,
    useMemo
} from 'react';
import { register, login, logout, fetchUserData } from '../services/auth.service';
import userService from '../services/user.service';

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const [userData, setUserData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchUser = useCallback(async () => {
        // setIsLoading(true);
        setError(null);
        try {
            const data = await fetchUserData();
            setUserData(data);
            return data;
        } catch (err) {
            setUserData(null);
            return null;
        } finally {
            setIsLoading(false);
        }
    }, []);

    const signUp = useCallback(async (userData) => {
        setIsLoading(true);
        setError(null);

        try {
            await register(userData);
            const data = await fetchUserData();
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
            await login(userData);
            const data = await fetchUserData();
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

    const deleteUser = async () => {
        setIsLoading(true);
        setError(null);
        try {
            await userService.deleteUser();
            setUserData(null);
        } catch (error) {
            console.error("Failed to delete user:", error.errors);
            setError(error.errors || { general: ["Failed to delete user."] });
            throw error.errors || { general: ["Failed to delete user."] };
        } finally {
            setIsLoading(false);
        }
    };

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
        deleteUser,
    }), [userData, isLoading, error, signUp, signIn, signOut, fetchUser, deleteUser]);

    return (
        <AuthContext value={contextValue}>
            {children}
        </AuthContext>
    );
}

export { AuthContext, AuthProvider };