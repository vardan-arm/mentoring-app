import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: {},
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
    logout(state) {
      // state.value--
      console.log("logout reducer");
      return {
        ...state,
        userInfo: initialState.userInfo,
        group: initialState.group,
      };
    },
    /*incrementByAmount(state, action) {
      state.value += action.payload
    },*/
  },
});

export default userSlice;
