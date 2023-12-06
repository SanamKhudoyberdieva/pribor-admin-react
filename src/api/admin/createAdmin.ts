import { AdminCreation } from '../../store/types/adminTypes';
import api from '../api';

export const createAdmin = async (obj: AdminCreation) => {
    return await api.post("/api/admin", obj);
}