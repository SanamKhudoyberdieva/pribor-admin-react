import { combineReducers } from "@reduxjs/toolkit";
import loginSlice from "./slices/loginSlice";
import bradsSlice from "./slices/brandsSlice";
import countriesSlice from "./slices/countriesSlice";
import customersSlice from "./slices/customersSlice";

const rootReducer = combineReducers({
  loginReducer: loginSlice,
  brandsReducer: bradsSlice,
  countriesReducer: countriesSlice,
  customersReducer: customersSlice
})

export default rootReducer