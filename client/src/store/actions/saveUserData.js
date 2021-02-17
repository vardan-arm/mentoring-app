import generalSlice from "../general";
import userSlice from "../user";
import formSlice from "../form";

export const saveUserData = () => {
  return async (dispatch, getState) => {
    dispatch(generalSlice.actions.setIsLoading(true));

    try {
      const userData = getState().form;

      const response = await fetch("/api/saveUserData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      const { data } = await response.json();

      console.log("data received from backend", data.userId);
      dispatch(generalSlice.actions.setIsSuccess());
      dispatch(generalSlice.actions.setRedirectUrl(`/profile/${data.userId}`));

      // cleanup form info in store
      dispatch(formSlice.actions.clearData());
    } catch (error) {
      dispatch(generalSlice.actions.setIsFailure(error));
    }
  };
};
