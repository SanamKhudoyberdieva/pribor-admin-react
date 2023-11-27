import api from '../api';

export const getAdmins = async () => {
    return await api.get("/api/admin");
}