import api from '../api';
import { CategoryUpdate } from '../../store/types/categoryTypes';

export const updateCategory = async (id: number, body: CategoryUpdate) => {
    return await api.put(`/api/category/${id}`, body);
}