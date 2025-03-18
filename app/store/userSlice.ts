import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  panCode: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setPanCard: (state, action) => {
      state.panCode = action.payload;
    },
  },
});

export const { setPanCard } = userSlice.actions;
export default userSlice.reducer;
