import api from '../api';

export const deleteBrand = async (id: string) => {
    return await api.delete(`/api/brand/${id}`);
}