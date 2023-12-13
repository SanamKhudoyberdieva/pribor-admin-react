import api from '../api';

export const createBrand = async (obj: FormData) => {
    return await api.post("/api/brand/", obj);
}