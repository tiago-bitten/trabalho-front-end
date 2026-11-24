import { v4 as uuidv4 } from 'uuid';
import { API_BASE_URL } from '../config/api';

const USERS_ENDPOINT = `${API_BASE_URL}/users`;

export const findUserByCredentials = async (email, password) => {
    const query = new URLSearchParams({ email, password });
    const response = await fetch(`${USERS_ENDPOINT}?${query}`);

    if (!response.ok) {
        throw new Error('Não foi possível validar as credenciais.');
    }

    const users = await response.json();
    return users[0] ?? null;
};

export const createUser = async (userData) => {
    const response = await fetch(USERS_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: uuidv4(), ...userData }),
    });

    if (!response.ok) {
        throw new Error('Não foi possível criar a conta.');
    }
};
