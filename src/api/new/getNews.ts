import api from '../api';

export const getNews = async () => {
    return await api.get("/api/news");
}