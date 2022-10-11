import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      state.user = action.payload;
    },
    logOutUser: (state) => {
      state.user = null;
    },
  },
});
export const userStatus = (state) => state.users?.user;
export const { loginUser, logOutUser } = userSlice.actions;
export default userSlice.reducer;
