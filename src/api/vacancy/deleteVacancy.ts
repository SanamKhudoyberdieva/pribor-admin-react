import api from '../api';

export const deleteVacancy = async (id: string) => {
    return await api.delete(`/api/vacancy/${id}`);
}