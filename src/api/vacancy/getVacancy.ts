import api from '../api';

export const getVacancy = async (id: number) => {
    return await api.get(`/api/vacancy/${id}`);
}