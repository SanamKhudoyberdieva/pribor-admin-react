import api from '../api';
import { BrandUpdate } from '../../store/types/brandTypes';

export const updateBrand = async (id: number, body: BrandUpdate) => {
    return await api.put(`/api/brand/${id}?descriptionEn=${body.descriptionEn}&descriptionRu=${body.descriptionRu}&descriptionUz=${body.descriptionUz}&isActive=${body.isActive}&nameEn=${body.nameEn}&nameRu=${body.nameRu}&nameUz=${body.nameUz}&seoDescription=${body.seoDescription}&seoTitle=${body.seoTitle}`);
}