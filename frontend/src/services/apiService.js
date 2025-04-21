import axios from 'axios';
import getCookie from './csrf';

const csrfToken = getCookie('csrftoken');

const axiosInstance = axios.create({
  baseURL: '/api/services/',
  headers: {
    'Content-Type': 'application/json',
    'X-CSRFToken': csrfToken, 
  },
  withCredentials: true, 
});

const getServices = () => axiosInstance.get('/');
const createService = (service) => axiosInstance.post('/', service);
const updateService = (id, service) => axiosInstance.put(`/${id}/`, service);
const deleteService = (id) => axiosInstance.delete(`/${id}/`);

export { getServices, createService, updateService, deleteService };
