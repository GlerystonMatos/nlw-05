import axios from 'axios';

const api = axios.create({
    baseURL: 'https://rxplantmanager-api.herokuapp.com',
});

export default api;