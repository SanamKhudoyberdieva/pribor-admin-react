import api from '../api';

export const updateBanner = async (id: number, body: FormData) => {
    return await api.put(`/api/banner/${id}`, body);
}