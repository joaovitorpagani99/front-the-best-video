import axios from 'axios';
import { getToken } from '../utils/useToken';

const api = axios.create({
  baseURL: import.meta.env.MODE === 'production'
    ? import.meta.env.VITE_API_BASE_URL
    : 'http://localhost:3000',
});

api.interceptors.request.use(async config => {
  const token = getToken();

  if (token) {
    config.headers.authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;