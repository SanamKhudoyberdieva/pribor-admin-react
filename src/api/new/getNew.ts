import api from '../api';

export const getNew = async (id: string) => {
    return await api.get(`/api/news/${id}`);
}