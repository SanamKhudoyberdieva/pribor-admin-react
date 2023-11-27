import api from '../api';
import { userLogin } from './types';

export const authAdmin = async (obj: userLogin) => {
    return await api.post("/api/admin/auth", obj);
}