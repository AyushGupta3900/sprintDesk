import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isAuthenticated: false,
  authInitialized: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    setAuthenticated(state, action) {
      state.isAuthenticated = action.payload;
    },
    setAuthInitialized(state) {
      state.authInitialized = true;
    },
    logout(state) {
      state.user = null;
      state.isAuthenticated = false;
      state.authInitialized = true;
    },
  },
});

export const {
  setUser,
  setAuthenticated,
  setAuthInitialized,
  logout,
} = authSlice.actions;

export default authSlice.reducer;
