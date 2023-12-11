import { combineReducers } from "@reduxjs/toolkit";
import loginSlice from "./slices/loginSlice";
import bradsSlice from "./slices/bradsSlice";

const rootReducer = combineReducers({
  loginReducer: loginSlice,
  brandsReducer: bradsSlice
})

export default rootReducer