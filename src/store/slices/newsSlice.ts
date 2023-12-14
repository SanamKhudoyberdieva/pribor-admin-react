import { New } from "../types/newTypes";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface NewsState {
  news: New[];
}

const initialState: NewsState = {
    news: []
};

const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    setNews(state, action: PayloadAction<New[]>) {
      state.news = action.payload;
    },
  },
});

export const { setNews } = newsSlice.actions;
export default newsSlice.reducer;