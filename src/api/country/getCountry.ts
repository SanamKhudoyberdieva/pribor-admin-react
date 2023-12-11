import api from '../api';

export const getCountry = async () => {
  try {
    let res = await api.get("/country")
    return res.data
  } catch (error: any) {
    return error.message
  }
}