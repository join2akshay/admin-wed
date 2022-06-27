import axios from 'axios';
export const Axios = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || 'https://wedppy.herokuapp.com/api',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': localStorage.getItem('ltk') || ''
  },
  maxContentLength: 20 * 1000 * 1000, // bytes => 5 MB
});

export const AdminAxios = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || 'https://wedppy.herokuapp.com/api/admin',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': localStorage.getItem('ltk') || ''
  },
  maxContentLength: 20 * 1000 * 1000, // bytes => 5 MB
});
