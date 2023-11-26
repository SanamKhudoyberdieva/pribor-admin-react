import api from '../api';
import { SliderData } from "./sliderTypes";
import { ErrorResponse } from "react-router-dom";

export const getSlider = async (lang: string): Promise<SliderData | ErrorResponse> => {
  try {
    let res = await api.get(`/slider?lang=${lang}`)
    return res.data
  } catch (error: any) {
    return error.message
  }
}