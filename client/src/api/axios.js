import axios from 'axios';

const API = axios.create({
  baseURL: 'https://taskmaster-backend-eight.vercel.app/api',
  withCredentials: true
});

export default API;