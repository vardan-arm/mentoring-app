import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // userInfo: {},
  // group: [],
};

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
      return initialState;
    },
  },
});

export default userSlice;
