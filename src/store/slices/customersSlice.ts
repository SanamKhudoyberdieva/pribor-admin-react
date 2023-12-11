import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Customer } from "../types/customerTypes";
interface CustomersState {
  customers: Customer[];
}

const initialState: CustomersState = {
  customers: []
};

const customersSlice = createSlice({
  name: 'customer',
  initialState,
  reducers: {
    setCustomers(state, action: PayloadAction<Customer[]>) {
      state.customers = action.payload;
    },
  },
});

export const { setCustomers } = customersSlice.actions;
export default customersSlice.reducer;