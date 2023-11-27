import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface authState{
  accessToken: string,
  refreshToken: string,
}

export interface adminState {
  id: number,
  username: string,
  isSuperuser: boolean,
  createdAt: string,
  updatedAt: string,
  lastVisit: string
}

export interface adminCreation {
  isSuperuser: boolean,
  password: string,
  username: string
}

interface loginState extends adminState, authState {}

const initialState: loginState = {
  id: 0,
  username: "",
  createdAt: "",
  updatedAt: "",
  lastVisit: "",
  isSuperuser: false,
  accessToken: "",
  refreshToken: "",
};


const loginSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setAuthAdmin(state, action: PayloadAction<authState>) {
      localStorage.setItem('accessToken', `${action.payload.accessToken}`)
      localStorage.setItem('refreshToken', `${action.payload.refreshToken}`)
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
    setMe(state, action: PayloadAction<adminState>) {
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
    }
  },
});

export const { setAuthAdmin, setMe, logOut } = loginSlice.actions;
export default loginSlice.reducer;