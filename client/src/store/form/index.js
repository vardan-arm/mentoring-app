import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // allEmployees: [],
  group: [],
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    setData(state, action) {
      console.log("form: setData reducer");
    },
    updateData(state, { payload }) {
      // state.value++
      console.log("form: updateData reducer", payload);
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
