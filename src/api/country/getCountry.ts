import api from '../api';

export const getCountry = async (id: string) => {
    return await api.get(`/api/country/${id}`);
}