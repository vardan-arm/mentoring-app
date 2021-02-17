import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateInfo(state, action) {
      // state.value++
      console.log("updateInfo reducer", state);
    },
    logout(state) {
      // state.value--
      console.log("logout reducer");
    },
    /*incrementByAmount(state, action) {
      state.value += action.payload
    },*/
  },
});

export default userSlice;
