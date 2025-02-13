import userSlice from "../user";
import generalSlice from "../general";
import { batch } from "react-redux";

export const fetchUserData = (userId) => {
  return async (dispatch) => {
    dispatch(generalSlice.actions.setIsLoading(true));

    try {
      const response = await fetch(`/api/profileData/${userId}`);
      const { data } = await response.json();

      batch(() => {
        dispatch(generalSlice.actions.setIsSuccess());
        dispatch(userSlice.actions.updateInfo(data));
      });
    } catch (error) {
      dispatch(generalSlice.actions.setIsFailure(error));
    }
  };
};
