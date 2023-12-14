import api from '../api';

export const getContacts = async () => {
    return await api.get("/api/contact");
}