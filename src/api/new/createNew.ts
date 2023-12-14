import api from '../api';

export const createNew = async (obj: FormData) => {
    return await api.post("/api/news", obj);
}