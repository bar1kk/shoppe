import {useAuthHeader} from 'react-auth-kit'

export const useHeader = () => {
    const authHeader = useAuthHeader();
    const header = {
        'Content-Type': 'application/json',
        'Authorization': authHeader()
    };

    return {header};
}
