import { authState } from '../../store/slices/loginSlice';
import api from '../api';
import { ErrorResponse } from "react-router-dom";
import { userLogin } from './types';

export const authAdmin = async (obj: userLogin): Promise<authState | ErrorResponse> => {
  try {
    let res = await api.post("/api/admin/auth");
    return res.data
  } catch (error: any) {
    return error.message
  }
}