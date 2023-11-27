import axios from "axios";

const api = axios.create({
    baseURL: 'http://80.90.188.12:8000',
});

// // Add an Axios request interceptor to include the Bearer token
api.interceptors.request.use(async (config) => {
    const accessToken = localStorage.getItem('accessToken');
    // const accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImM3OGRiMzZmLWQ5NTAtNDViNS05YTcwLTYyZTBlNGQ3ZjI1NSIsInBob25lIjoiKzk5ODk5Nzk0NDQyMyIsImlhdCI6MTY5OTYzNjE4MywiZXhwIjoxNzA3NDEyMTgzfQ.sZW-VS8kXkV8xO1VI45AzGCgQcBLG_nh3gYr2sMqSl0"
    if (accessToken) {
      config.headers['Authorization'] = `${accessToken}`;
    }
    return config;
  });

export default api;
