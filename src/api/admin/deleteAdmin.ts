import api from '../api';

export const deleteAdmin = async (id: string) => {
    return await api.delete(`/api/admin/${id}`);
}