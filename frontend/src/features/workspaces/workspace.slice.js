import { createSlice } from "@reduxjs/toolkit";

const persistedWorkspace = localStorage.getItem("currentWorkspace");

const initialState = {
  currentWorkspace: persistedWorkspace
    ? JSON.parse(persistedWorkspace)
    : null,
};

const workspaceSlice = createSlice({
  name: "workspace",
  initialState,
  reducers: {
    setCurrentWorkspace(state, action) {
      state.currentWorkspace = action.payload;
      localStorage.setItem(
        "currentWorkspace",
        JSON.stringify(action.payload)
      );
    },
    clearWorkspace(state) {
      state.currentWorkspace = null;
      localStorage.removeItem("currentWorkspace");
    },
  },
});

export const {
  setCurrentWorkspace,
  clearWorkspace,
} = workspaceSlice.actions;

export default workspaceSlice.reducer;
