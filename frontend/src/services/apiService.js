import axios from 'axios';

const API_URL = 'http://localhost:8000/api/services/';

const getServices = () => axios.get(API_URL);
const createService = (service) => axios.post(API_URL, service);
const updateService = (id, service) => axios.put(`${API_URL}${id}/`, service);
const deleteService = (id) => axios.delete(`${API_URL}${id}/`);

export { getServices, createService, updateService, deleteService };
