import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import reduxThunk from "redux-thunk";

import userSlice from "./user";
import formSlice from "./form";
import generalSlice from "./general";

const store = configureStore({
  reducer: {
    general: generalSlice.reducer,
    user: userSlice.reducer,
    form: formSlice.reducer,
  },
  middleware: [...getDefaultMiddleware(), reduxThunk],
  devTools: true,
});

export default store;
