import { configureStore } from "@reduxjs/toolkit";
import reduxThunk from "redux-thunk";

import userReducer from "./reducers/userReducer";

const store = configureStore({
  reducer: {
    user: userReducer,
  },
  middleware: [reduxThunk],
  devTools: true,
});

export default store;
