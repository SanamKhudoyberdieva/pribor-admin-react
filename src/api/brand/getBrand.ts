import api from '../api';

export const getBrand = async (id: string) => {
    return await api.get(`/api/brand/${id}`);
}