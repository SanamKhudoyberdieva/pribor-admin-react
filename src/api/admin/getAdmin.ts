import api from '../api';

export const getAdmin = async () => {
    return await api.get("/api/admin/me");
}