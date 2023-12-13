import api from '../api';

export const getProducts = async () => {
  return await api.get("/api/product");
}