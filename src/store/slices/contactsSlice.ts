import { Contact } from "../types/contactTypes";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ContactsState {
    contacts: Contact[];
}

const initialState: ContactsState = {
    contacts: []
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    setContacts(state, action: PayloadAction<Contact[]>) {
      state.contacts = action.payload;
    },
  },
});

export const { setContacts } = contactsSlice.actions;
export default contactsSlice.reducer;