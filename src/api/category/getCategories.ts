import api from '../api';

export const getCategories = async () => {
    return await api.get("/api/category/all");
}