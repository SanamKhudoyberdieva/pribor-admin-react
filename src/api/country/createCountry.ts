import api from '../api';
import { CountryCreation } from '../../store/types/countryTypes';

export const createCountry = async (obj: CountryCreation) => {
    return await api.post("/api/country/", obj);
}