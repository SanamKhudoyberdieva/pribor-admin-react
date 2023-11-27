import { adminCreation } from '../../store/types/adminTypes';
import api from '../api';

export const createAdmin = async (obj: adminCreation) => {
    return await api.post("/api/admin", obj);
}