import api from '../api';

export const getCountries = async () => {
  return await api.get("/api/country");
}