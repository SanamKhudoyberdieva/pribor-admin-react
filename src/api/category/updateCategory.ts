import api from '../api';
import { CategoryUpdate } from '../../store/types/categoryTypes';

export const updateCategory = async (id: number, body: CategoryUpdate) => {
    return await api.put(`/api/category/${id}?descriptionEn=${body.descriptionEn}&descriptionRu=${body.descriptionRu}&descriptionUz=${body.descriptionUz}&isActive=${body.isActive}&nameEn=${body.nameEn}&nameRu=${body.nameRu}&nameUz=${body.nameUz}&parentId=${body.parentId}&seoDescription=${body.seoDescription}&seoTitle=${body.seoTitle}`);
}