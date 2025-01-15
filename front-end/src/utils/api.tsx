import axio from 'axios';

export const URL = 'http://localhost:8000/';

export const api = axio.create({
    baseURL: URL,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
});
