import { AdminUpdateState } from '../../pages/admins/types';
import api from '../api';

export const updateAdmin = async (id: number, body: AdminUpdateState) => {
    return await api.put(`/api/admin/${id}?password=${body.password}&isSuperuser=${body.isSuperuser}&username=${body.username}`);
}