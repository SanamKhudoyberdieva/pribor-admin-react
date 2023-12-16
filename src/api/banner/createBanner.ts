import api from '../api';

export const createBanner = async (obj: FormData) => {
    return await api.post("/api/banner/", obj);
}