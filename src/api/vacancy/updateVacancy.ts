import api from '../api';

export const updateVacancy = async (id: number, body: FormData) => {
    return await api.put(`/api/vacancy/${id}`, body);
}