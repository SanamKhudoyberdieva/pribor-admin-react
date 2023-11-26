import api from '../api';
import { BranchData } from './branchTypes';
import { ErrorResponse } from "react-router-dom";

export const getBranch = async (): Promise<BranchData | ErrorResponse> => {
  try {
    let res = await api.get("/branch")
    return res.data
  } catch (error: any) {
    return error.message
  }
}