import generalSlice from "../general";
import userSlice from "../user";
import { batch } from 'react-redux'

export const doLogin = (userId) => {
  return async (dispatch) => {
    dispatch(generalSlice.actions.setIsLoading(true));

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userId),
      });
      // const { data } = await response.json();
      const { data, error } = await response.json();

      console.log("data received from backend", {data}, {error});
      if (error) {
        dispatch(generalSlice.actions.setIsFailure(error))
      } else {
        batch(() => {
          dispatch(userSlice.actions.updateInfo(data));

          dispatch(generalSlice.actions.setIsSuccess());
          dispatch(generalSlice.actions.setIsLoginDialogOpened(false));
          dispatch(generalSlice.actions.setRedirectUrl(`/profile/${data.id}`));
        });
      }
    } catch (error) {
      dispatch(generalSlice.actions.setIsFailure(error));
    }
  };
};
