import api from '../api';

export const getVacancies = async () => {
    return await api.get("/api/vacancy");
}