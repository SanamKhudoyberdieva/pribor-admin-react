import api from '../api';
import { CategoryCreation } from '../../store/types/categoryTypes';

export const createCategory = async (obj: CategoryCreation) => {
    return await api.post("/api/category", obj);
}