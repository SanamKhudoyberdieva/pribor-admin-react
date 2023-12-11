import api from '../api';
import { userLogin } from '../../store/types/adminTypes';

export const authAdmin = async (obj: userLogin) => {
    return await api.post("/api/admin/auth", obj);
}