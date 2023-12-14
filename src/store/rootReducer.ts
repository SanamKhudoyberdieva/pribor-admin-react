import { combineReducers } from "@reduxjs/toolkit";
import newsSlice from "./slices/newsSlice";
import loginSlice from "./slices/loginSlice";
import bradsSlice from "./slices/brandsSlice";
import contactsSlice from "./slices/contactsSlice";
import productsSlice from "./slices/productsSlice";
import countriesSlice from "./slices/countriesSlice";
import customersSlice from "./slices/customersSlice";
import categoriesSlice from "./slices/categoriesSlice";

const rootReducer = combineReducers({
  loginReducer: loginSlice,
  brandsReducer: bradsSlice,
  countriesReducer: countriesSlice,
  customersReducer: customersSlice,
  categoriesReducer: categoriesSlice,
  productsReducer: productsSlice,
  newsReducer: newsSlice,
  contactsReducer: contactsSlice,
})

export default rootReducer;