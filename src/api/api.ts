import axios from "axios";

const api = axios.create({
    baseURL: 'http://80.90.188.12:8000',
});

// // Add an Axios request interceptor to include the Bearer token
api.interceptors.request.use(async (config) => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      config.headers['Authorization'] = `${accessToken}`;
    }
    return config;
  });

export default api;
