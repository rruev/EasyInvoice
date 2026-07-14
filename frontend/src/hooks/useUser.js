import { AuthContext } from '../context/AuthContext';
import { use } from 'react';

export const useUser = () => {
    const ctx = use(AuthContext);
    if (!ctx) {
        throw new Error('useUser must be used within an AuthProvider');
    }
    const { userData, isLoading, error, setError, signUp, signIn, signOut } = ctx;

    return { userData, isLoading, error, setError, signUp, signIn, signOut };
}

export default useUser;