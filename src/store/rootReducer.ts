import { combineReducers } from "@reduxjs/toolkit";
import loginSlice from "./slices/loginSlice";
import bradsSlice from "./slices/bradsSlice";
import countriesSlice from "./slices/countriesSlice";

const rootReducer = combineReducers({
  loginReducer: loginSlice,
  brandsReducer: bradsSlice,
  countriesReducer: countriesSlice
})

export default rootReducer