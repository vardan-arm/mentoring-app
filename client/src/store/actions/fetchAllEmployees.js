import generalSlice from "../general";

export const fetchAllEmployees = () => {
  return async (dispatch) => {
    dispatch(generalSlice.actions.setIsLoading(true));

    try {
      const response = await fetch("/api/employees");
      const { data } = await response.json();

      console.log("data received from backend", data);
      dispatch(generalSlice.actions.setIsSuccess());
      dispatch(generalSlice.actions.setAllEmployees(data));
    } catch (error) {
      dispatch(generalSlice.actions.setIsFailure(error));
    }
  };
};
