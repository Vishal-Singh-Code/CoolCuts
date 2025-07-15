import axios from 'axios';
import getCookie from './csrf';

const axiosInstance = axios.create({
  baseURL: '/api/services/',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Automatically attach the latest CSRF token
axiosInstance.interceptors.request.use(
  (config) => {
    config.headers['X-CSRFToken'] = getCookie('csrftoken');
    return config;
  },
  (error) => Promise.reject(error)
);

const getServices = () => axiosInstance.get('/');
const createService = (service) => axiosInstance.post('/', service);
const updateService = (id, service) => axiosInstance.put(`/${id}/`, service);
const deleteService = (id) => axiosInstance.delete(`/${id}/`);

export { getServices, createService, updateService, deleteService };
