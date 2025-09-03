

export const checkApi = async (url: string) => {
    try {
        const res = await fetch(url, {
            method: 'GET',
            credentials: 'include'
        });
        const data = await res.json();
        console.log('API response:', data);
        return data;
    } catch (error) {
        console.error('Error checking API:', error);
        return null;
    }
}