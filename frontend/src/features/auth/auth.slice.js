import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
    authInitialized: false,
  },
  reducers: {
    setAuthenticated(state, action) {
      state.isAuthenticated = action.payload;
    },
    setAuthInitialized(state) {
      state.authInitialized = true;
    },
    logout(state) {
      state.isAuthenticated = false;
    },
  },
});

export const {
  setAuthenticated,
  setAuthInitialized,
  logout,
} = authSlice.actions;

export default authSlice.reducer;
