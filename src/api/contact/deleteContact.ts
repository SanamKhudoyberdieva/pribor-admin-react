import api from '../api';

export const deleteContact = async (id: string) => {
    return await api.delete(`/api/contact/${id}`);
}