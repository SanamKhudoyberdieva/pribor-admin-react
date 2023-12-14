import api from '../api';
import { ContactCreation } from '../../store/types/contactTypes';

export const createContact = async (obj: ContactCreation) => {
    return await api.post("/api/contact/", obj);
}
