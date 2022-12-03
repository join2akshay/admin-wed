import axios from 'axios';
export const Axios = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL1 || 'https://wedppy.up.railway.app/api',
  timeout: 30000,
  headers: {
   'Authorization': localStorage.getItem('ltk') || ''
  },
  maxContentLength: 20 * 1000 * 1000, // bytes => 5 MB
});

export const AdminAxios = axios.create({
  baseURL: 'https://wedppy.up.railway.app/api/admin',
  // baseURL: 'http://localhost:8000/api/admin',
  timeout: 30000,
  headers: {
 'Authorization': localStorage.getItem('ltk') || ''
  },
  maxContentLength: 20 * 1000 * 1000, // bytes => 5 MB
});

export const BaseAxios = axios.create({
  baseURL: 'https://wedppy.up.railway.app/',
  // baseURL: 'http://localhost:8000/',
  timeout: 30000,
  headers: {
   'Authorization': localStorage.getItem('ltk') || ''
  },
  maxContentLength: 20 * 1000 * 1000, // bytes => 5 MB
});
