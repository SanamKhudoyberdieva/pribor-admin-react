import api from '../api';
import { AdminUpdateState } from '../../store/types/adminTypes';

export const updateAdmin = async (id: number, body: AdminUpdateState) => {
    return await api.put(`/api/admin/${id}?password=${body.password}&isSuperuser=${body.isSuperuser}&username=${body.username}`);
}