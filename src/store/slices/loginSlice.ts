import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Admin, Admins, CurrentAdmin } from "../types/adminTypes";
export interface AuthState{
  accessToken: string,
  refreshToken: string,
}

interface LoginState extends CurrentAdmin, AuthState, Admins {}

const initialState: LoginState = {
  id: 0,
  username: "",
  createdAt: "",
  updatedAt: "",
  lastVisit: "",
  isSuperuser: false,
  accessToken: "",
  refreshToken: "",
  admins: [],
};


const loginSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setAuthAdmin(state, action: PayloadAction<AuthState>) {
      localStorage.setItem('accessToken', `${action.payload.accessToken}`)
      localStorage.setItem('refreshToken', `${action.payload.refreshToken}`)
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
    setMe(state, action: PayloadAction<CurrentAdmin>) {
      state.id = action.payload.id;
      state.username = action.payload.username;
      state.lastVisit = action.payload.lastVisit;
      state.updatedAt = action.payload.updatedAt;
      state.createdAt = action.payload.createdAt;
      state.isSuperuser = action.payload.isSuperuser;
    },
    logOut(state) {
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
    },
    setAdmins(state, action: PayloadAction<Admin[]>) {
      state.admins = action.payload;
    },
  },
});

export const { setAuthAdmin, setMe, logOut, setAdmins } = loginSlice.actions;
export default loginSlice.reducer;