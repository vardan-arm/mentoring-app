import { createSelector } from "@reduxjs/toolkit";

// export const getForm = createSelector(state => state.form);
/*export const getForm = createSelector(state => {
  console.log({state});
  // return state.form
  return state
});*/
export const getForm = state => state.form;
