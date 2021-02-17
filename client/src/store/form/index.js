import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    setData(state, action) {
      console.log("form: setData reducer");
    },
    updateData(state, { payload }) {
      // state.value++
      console.log("form: updateData reducer");
      return {
        ...state,
        ...payload,
      };
    },
    clearData(state) {
      console.log("form: clearData reducer");
    },
  },
});

export default formSlice;
