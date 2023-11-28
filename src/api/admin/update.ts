import { authState } from '../../store/slices/loginSlice';
import api from '../api';
import { ErrorResponse } from "react-router-dom";

export const updateAdmin = async (): Promise<authState | ErrorResponse> => {
  try {
    let res = await api.get("/api/admin/auth");
    return res.data
  } catch (error: any) {
    return error.message
  }
}