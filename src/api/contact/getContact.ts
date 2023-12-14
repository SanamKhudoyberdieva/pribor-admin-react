import api from '../api';

export const getContact = async (id: string) => {
    return await api.get(`/api/contact/${id}`);
}