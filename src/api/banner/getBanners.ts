import api from '../api';

export const getBanners = async () => {
    return await api.get("/api/banner");
}