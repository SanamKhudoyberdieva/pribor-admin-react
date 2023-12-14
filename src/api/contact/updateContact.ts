import api from '../api';
import { ContactUpdate } from '../../store/types/contactTypes';

export const updateContact = async (id: number, body: ContactUpdate) => {
    return await api.put(`/api/contact/${id}`, body);
}