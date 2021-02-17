import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  hasErrors: false,
  errorMessage: "",
  redirectUrl: "", // whenever this is not empty string, the page will be redirected
  allEmployees: [],
  isLoginDialogOpened: false,
};

const generalSlice = createSlice({
  name: "general",
  initialState,
  reducers: {
    setIsLoading: (state, { payload }) => {
      return {
        ...state,
        isLoading: payload,
      };
    },
    setIsSuccess: (state) => ({
      ...state,
      isLoading: false,
      hasErrors: false,
      errorMessage: "",
      allEmployees: [],
    }),
    setIsFailure: (state, { payload }) => ({
      ...state,
      isLoading: false,
      hasErrors: true,
      errorMessage: payload,
    }),
    setIsLoginDialogOpened: (state, { payload }) => ({
      ...state,
      isLoginDialogOpened: payload,
    }),
    setRedirectUrl: (state, { payload }) => ({
      ...state,
      redirectUrl: payload,
    }),
    setAllEmployees: (state, { payload }) => ({
      ...state,
      allEmployees: payload,
    }),
  },
});

export default generalSlice;
