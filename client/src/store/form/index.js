import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  group: [],
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    updateData(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
    clearData() {
      return initialState;
    },
  },
});

export default formSlice;
