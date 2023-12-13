import { CategoryCreation } from '../../store/types/categoryTypes';
import api from '../api';

export const createCategory = async (obj: CategoryCreation) => {
    return await api.post("/api/category", obj);
}