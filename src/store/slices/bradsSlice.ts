import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Brand } from "../types/bradTypes";



interface BrandsState {
  brands: Brand[];
}

const initialState: BrandsState = {
  brands: []
};


const brandsSlice = createSlice({
  name: 'brands',
  initialState,
  reducers: {
    setBrands(state, action: PayloadAction<Brand[]>) {
      state.brands = action.payload;
    },
  },
});

export const { setBrands } = brandsSlice.actions;
export default brandsSlice.reducer;