import { createSelector } from "@reduxjs/toolkit";
import { getUser } from "./user";

// export const getForm = createSelector(state => state.form);
/*export const getForm = createSelector(state => {
  console.log({state});
  // return state.form
  return state
});*/
export const getForm = (state) => state.form;

export const getUserGroup = createSelector(getForm, (form) => {
  return form.group;
});
