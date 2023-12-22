export const useHttp = () => {
    const request = async (url, method = 'GET', body = null, headers = { 'Content-Type': 'application/json' }) => {
        try {
            const response = await fetch(url, { method, body, headers });

            if (!response.ok) {
                throw new Error(response.status);
            }

            if (response.headers.get('content-type') !== 'application/json') {
                return response;
            }

            const data = await response.json();
            return data;
        } catch (e) {
            throw e;
        }
    };

    return { request };
};
