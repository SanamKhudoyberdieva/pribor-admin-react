import { combineReducers } from "@reduxjs/toolkit";
import productSlice from "./slices/productSlice";

const rootReducer = combineReducers({
  productReducer: productSlice
})

export default rootReducer