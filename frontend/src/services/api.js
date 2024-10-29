// src/services/api.js
import axios from 'axios';

const API_URL = '/user/'; // Adjust as necessary

const register = (username, email, password) => {
  return axios.post(`${API_URL}register/`, { username, email, password });
};

const login = (username, password) => {
  return axios.post(`${API_URL}login/`, { username, password });
};

const logout = () => {
  return axios.post(`${API_URL}logout/`);
};

export default {
  register,
  login,
  logout
};
