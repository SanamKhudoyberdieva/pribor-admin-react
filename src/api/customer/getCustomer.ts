import api from '../api';

export const getCustomer = async (id: string) => {
    return await api.get(`/api/customer/${id}`);
}