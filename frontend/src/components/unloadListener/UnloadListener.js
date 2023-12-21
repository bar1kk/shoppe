import { useEffect } from 'react';
import { useIsAuthenticated, useSignOut, useAuthUser } from 'react-auth-kit';

const UnloadListener = () => {
    const isAuthenticated = useIsAuthenticated();
    const signOut = useSignOut();
    const auth = useAuthUser();

    const handleUnload = () => {
        signOut();
    };

    useEffect(() => {
        if (isAuthenticated() && auth().rememberMe === false) {
            window.addEventListener('unload', handleUnload);
            return () => {
                window.removeEventListener('unload', handleUnload);
            };
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAuthenticated, auth]);

    return null;
};

export default UnloadListener;
