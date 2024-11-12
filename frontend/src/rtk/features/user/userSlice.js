import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    email: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.email = action.payload.email;
    },
    logoutUser: (state) => {
      state.email = null;
    },
  },
});

export const { setUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
