import axios from "axios";

const api = axios.create({
    baseURL: 'https://boytoy.fly.dev/api/v1',
});

// // Add an Axios request interceptor to include the Bearer token
api.interceptors.request.use(async (config) => {
    // const token = localStorage.getItem('token');
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImM3OGRiMzZmLWQ5NTAtNDViNS05YTcwLTYyZTBlNGQ3ZjI1NSIsInBob25lIjoiKzk5ODk5Nzk0NDQyMyIsImlhdCI6MTY5OTYzNjE4MywiZXhwIjoxNzA3NDEyMTgzfQ.sZW-VS8kXkV8xO1VI45AzGCgQcBLG_nh3gYr2sMqSl0"
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  });

export default api;
