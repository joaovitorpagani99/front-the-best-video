import axios from 'axios';
import { getToken } from '../utils/useToken'

const api = axios.create({
  baseURL: 'http://localhost:3000',
});

api.interceptors.request.use(async config => {
  const token = getToken();

  if (token) {
    api.defaults.headers.authorization = `Bearer ${token}`;
  }

  return config;
})

export default api;