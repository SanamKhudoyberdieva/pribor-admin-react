import api from '../api';

export const deleteAdmin = async (id: string | undefined) => {
    return await api.delete(`/api/admin/${id}`);
}