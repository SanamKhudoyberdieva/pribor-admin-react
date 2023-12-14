import api from '../api';

export const getVacancy = async (id: string) => {
    return await api.get(`/api/vacancy/${id}`);
}