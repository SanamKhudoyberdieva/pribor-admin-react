import api from '../api';

export const getCustomers = async () => {
    return await api.get("/api/customer");
}