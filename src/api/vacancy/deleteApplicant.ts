import api from '../api';

export const deleteApplicant = async (id: string) => {
    return await api.delete(`/api/vacancy/applicant/${id}`);
}