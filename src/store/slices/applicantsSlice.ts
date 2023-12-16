import { Applicant } from "../types/applicantTypes";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ApplicantsState {
  applicants: Applicant[];
}

const initialState: ApplicantsState = {
  applicants: []
};

const applicantsSlice = createSlice({
  name: 'applicants',
  initialState,
  reducers: {
    setApplicants(state, action: PayloadAction<Applicant[]>) {
      state.applicants = action.payload;
    },
  },
});

export const { setApplicants } = applicantsSlice.actions;
export default applicantsSlice.reducer;