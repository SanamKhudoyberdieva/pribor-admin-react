import api from '../api';

export const activateAdmin = async (id: string) => {
    return await api.put(`/api/admin/activate/${id}`);
}