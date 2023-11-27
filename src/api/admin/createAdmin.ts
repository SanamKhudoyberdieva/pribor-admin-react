import { adminCreation } from '../../store/slices/loginSlice';
import api from '../api';

export const createAdmin = async (obj: adminCreation) => {
    return await api.post("/api/admin", obj);
}