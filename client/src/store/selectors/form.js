import { createSelector } from "@reduxjs/toolkit";

export const getForm = (state) => state.form;

export const getUserGroup = createSelector(getForm, (form) => {
  return form.group;
});
