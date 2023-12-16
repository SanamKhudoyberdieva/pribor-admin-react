import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Banner } from "../types/bannerTypes";
interface BannersState {
  banners: Banner[];
}

const initialState: BannersState = {
    banners: []
};

const bannersSlice = createSlice({
  name: 'banners',
  initialState,
  reducers: {
    setBanners(state, action: PayloadAction<Banner[]>) {
      state.banners = action.payload;
    },
  },
});

export const { setBanners } = bannersSlice.actions;
export default bannersSlice.reducer;