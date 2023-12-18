import api from '../api';

export const deleteVacancy = async (id: number) => {
    return await api.delete(`/api/vacancy/${id}`);
}