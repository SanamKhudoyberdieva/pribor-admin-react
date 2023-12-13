import api from '../api';

export const getCategory = async (id: string) => {
    return await api.get(`/api/category/${id}`);
}