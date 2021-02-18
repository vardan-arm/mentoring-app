import generalSlice from "../general";
import userSlice from "../user";
import formSlice from "../form";
import { batch } from "react-redux";

// TODO: implement this!!!
export const updateUser = () => {
  return async (dispatch, getState) => {
    dispatch(generalSlice.actions.setIsLoading(true));

    try {
      const userData = {
        ...getState().form,
        id: getState().user.id,
      };

      const response = await fetch("/api/updateUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      const { data } = await response.json();

      batch(() => {
        dispatch(generalSlice.actions.setIsSuccess());
        dispatch(userSlice.actions.updateInfo(data.user));
        dispatch(
          generalSlice.actions.setRedirectUrl(`/profile/${data.user.userId}`)
        );
      });

      // cleanup form info in store
      dispatch(formSlice.actions.clearData());
    } catch (error) {
      dispatch(generalSlice.actions.setIsFailure(error));
    }
  };
};
