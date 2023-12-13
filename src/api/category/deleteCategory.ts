import api from '../api';

export const deleteCategory = async (id: string) => {
    return await api.delete(`/api/category/${id}`);
}