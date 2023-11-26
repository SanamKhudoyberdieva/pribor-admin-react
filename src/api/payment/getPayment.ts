import api from '../api';
import { PaymentData } from './paymentTypes';
import { ErrorResponse } from "react-router-dom";

export const getPayment = async (): Promise<PaymentData | ErrorResponse> => {
  try {
    let res = await api.get('/payment')
    return res.data
  } catch (error: any) {
    return error.message
  }
}