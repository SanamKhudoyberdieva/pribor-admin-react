import api from '../api';

export const deleteCountry = async (id: string) => {
    return await api.delete(`/api/country/${id}`);
}