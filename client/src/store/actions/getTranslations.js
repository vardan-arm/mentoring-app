import generalSlice from "../general";
import { batch } from "react-redux";

export const getTranslations = (lang = 'en') => {
  return async (dispatch) => {
    dispatch(generalSlice.actions.setIsLoading(true));

    try {
      const response = await fetch(`/api/translations?lang=${lang}`);

      const { data, error } = await response.json();

      if (error) {
        dispatch(generalSlice.actions.setIsFailure(error));
      } else {
        batch(() => {
          // dispatch(userSlice.actions.updateInfo(data));

          dispatch(generalSlice.actions.setIsSuccess());
          dispatch(generalSlice.actions.setTranslations(data));
        });
      }
    } catch (error) {
      dispatch(generalSlice.actions.setIsFailure(error));
    }
  };
};
