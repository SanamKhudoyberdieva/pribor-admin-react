import api from '../api';
import { CountryUpdate } from '../../store/types/countryTypes';

export const updateCountry = async (id: number, body: CountryUpdate) => {
    return await api.put(`/api/country/${id}?nameEn=${body.nameEn}&nameRu=${body.nameRu}&nameUz=${body.nameUz}`);
}