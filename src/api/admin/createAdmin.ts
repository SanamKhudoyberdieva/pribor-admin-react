import api from '../api';
import { AdminCreation } from '../../store/types/adminTypes';

export const createAdmin = async (obj: AdminCreation) => {
    return await api.post("/api/admin", obj);
}