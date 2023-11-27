import { combineReducers } from "@reduxjs/toolkit";
import productSlice from "./slices/productSlice";
import loginSlice from "./slices/loginSlice";

const rootReducer = combineReducers({
  productReducer: productSlice,
  loginReducer: loginSlice
})

export default rootReducer