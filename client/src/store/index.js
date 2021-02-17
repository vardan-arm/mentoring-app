import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import reduxThunk from "redux-thunk";

// import userReducer from "./DELETE_reducers/userReducer";
// import formReducer from "./DELETE_reducers/formReducer";
import userSlice from "./user";
import formSlice from "./form";
import generalSlice from "./general";

const store = configureStore({
  reducer: {
    // user: userReducer,
    general: generalSlice.reducer,
    user: userSlice.reducer,
    form: formSlice.reducer,
  },
  // preloadedState: {},
  middleware: [...getDefaultMiddleware(), reduxThunk],
  devTools: true,
});

export default store;
