import api from '../api';
import { BrandCreation } from '../../store/types/brandTypes';

export const createBrand = async (obj: BrandCreation) => {
    return await api.post("/api/brand/", obj);
}