import api from '../api';

export const getApplicants = async () => {
    return await api.get("/api/vacancy/applicant");
}