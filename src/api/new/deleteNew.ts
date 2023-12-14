import api from '../api';

export const deleteNew = async (id: string) => {
    return await api.delete(`/api/news/${id}`);
}