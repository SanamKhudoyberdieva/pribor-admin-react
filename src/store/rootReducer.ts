import { combineReducers } from "@reduxjs/toolkit";
import loginSlice from "./slices/loginSlice";

const rootReducer = combineReducers({
  loginReducer: loginSlice,
})

export default rootReducer