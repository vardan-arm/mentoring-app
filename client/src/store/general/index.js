import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  hasErrors: false,
  errorMessage: '',
  allEmployees: []
}

const generalSlice = createSlice({
  name: 'general',
  initialState,
  reducers: {
    setIsLoading: (state, {payload}) => {
      return {
        ...state,
        isLoading: payload
      }
    },
    setIsSuccess: (state) => ({
      ...state,
      isLoading: false,
      hasErrors: false,
      errorMessage: ''
    }),
    setIsFailure: (state, {payload}) => ({
      ...state,
      isLoading: false,
      hasErrors: true,
      errorMessage: payload.message
    }),
    setAllEmployees: (state, {payload}) => ({
      ...state,
      allEmployees: payload
    })
  }
})

export default generalSlice;
