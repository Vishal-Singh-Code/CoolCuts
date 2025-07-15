import axios from 'axios';
import getCookie from './csrf';

const API_URL = '/user/';

const register = (username, email, password) => {
  return axios.post(`${API_URL}register/`, { username, email, password }, {
    headers: {
      "X-CSRFToken": getCookie("csrftoken"),
    },
    withCredentials: true,
  });
};

const login = (username, password) => {
  return axios.post(`${API_URL}login/`, { username, password }, {
    headers: {
      "X-CSRFToken": getCookie("csrftoken"),
    },
    withCredentials: true,
  });
};

const logout = () => {
  return axios.post(`${API_URL}logout/`, {}, {
    headers: {
      "X-CSRFToken": getCookie("csrftoken"),
    },
    withCredentials: true,
  });
};

const apiService = {
  register,
  login,
  logout,
};

export default apiService;

