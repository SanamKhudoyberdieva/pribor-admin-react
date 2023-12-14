import api from '../api';

export const updateNew = async (id: number, body: FormData) => {
    return await api.put(`/api/news/${id}`, body);
}