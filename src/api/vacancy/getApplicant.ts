import api from '../api';

export const getApplicant = async (id: string) => {
    return await api.get(`/api/vacancy/applicant/${id}`);
}