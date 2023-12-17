import api from '../api';

export const createVacancy = async (obj: FormData) => {
    return await api.post("/api/vacancy", obj);
}