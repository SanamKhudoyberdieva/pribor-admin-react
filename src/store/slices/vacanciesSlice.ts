import { Vacancy } from "../types/vacancyTypes";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface VacanciesState {
    vacancies: Vacancy[];
}

const initialState: VacanciesState = {
    vacancies: []
};

const vacanciesSlice = createSlice({
  name: 'vacancies',
  initialState,
  reducers: {
    setVacancies(state, action: PayloadAction<Vacancy[]>) {
      state.vacancies = action.payload;
    },
  },
});

export const { setVacancies } = vacanciesSlice.actions;
export default vacanciesSlice.reducer;