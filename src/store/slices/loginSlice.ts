import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Admin, Admins } from "../types/adminTypes";
export interface AuthState{
  accessToken: string,
  refreshToken: string,
}

interface LoginState extends AuthState, Admins, Admin {}

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
  deletedAt: "",
  isActive: false,
  password: ""
};


const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setAuthAdmin(state, action: PayloadAction<AuthState>) {
      localStorage.setItem('accessToken', `${action.payload.accessToken}`)
      localStorage.setItem('refreshToken', `${action.payload.refreshToken}`)
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
    setMe(state, action: PayloadAction<Admin>) {
      state.id = action.payload.id;
      state.username = action.payload.username;
      state.lastVisit = action.payload.lastVisit;
      state.updatedAt = action.payload.updatedAt;
      state.createdAt = action.payload.createdAt;
      state.isSuperuser = action.payload.isSuperuser;
      state.isActive = action.payload.isActive;
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