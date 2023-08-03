import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: null,
};

export const hireSlice = createSlice({
  name: "hire",
  initialState,
  reducers: {
    sendHireTo: (state, action) => {
      state.data = action.payload;
    },
    reset: (state) => initialState,
  },
});

export const { sendHireTo, clearData } = hireSlice.actions;
export default hireSlice.reducer;