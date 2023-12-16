import api from '../api';

export const getBanner = async (id: string) => {
    return await api.get(`/api/banner/${id}`);
}