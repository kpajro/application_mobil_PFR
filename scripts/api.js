const API_URL = 'http://localhost:8000/api';

const handleResponse = async (response) => {
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Something went wrong');
    }
    return response.json();
};

export const fetchYourEntities = async () => {
    try {
        const response = await fetch(`${API_URL}/api`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        });
        return await handleResponse(response);
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};

export const createYourEntity = async (entityData) => {
    try {
        const response = await fetch(`${API_URL}/api`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(entityData),
        });
        return await handleResponse(response);
    } catch (error) {
        console.error('Error creating entity:', error);
        throw error;
    }
};