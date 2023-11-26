import api from '../api';

export const getProduct = async (lang: string) => {
    let res = await api.get(`/products?lang=${lang}`)
    return res
}