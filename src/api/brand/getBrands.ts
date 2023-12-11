import api from '../api';

export const getBrands = async () => {
    return await api.get("/api/brand");
}