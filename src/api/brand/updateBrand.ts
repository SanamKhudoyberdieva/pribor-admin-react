import api from '../api';

export const updateBrand = async (id: number, body: FormData) => {
    return await api.put(`/api/brand/${id}`, body);
}