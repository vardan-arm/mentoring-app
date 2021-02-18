import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateInfo(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
    logout() {
      // In real application we will do backend logout as well
      return initialState;
    },
  },
});

export default userSlice;
