import api from '../api';

export const deleteBanner = async (id: string) => {
    return await api.delete(`/api/banner/${id}`);
}