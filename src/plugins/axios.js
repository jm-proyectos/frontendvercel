import axios from 'axios';

const API = 'https://backendvercel-umber.vercel.app';
const axiosInstance = axios.create({
  //baseURL: 'http://localhost:3000/api',
  baseURL: `${API}/api`,
  withCredentials: true,
});

export default axiosInstance;