import { createSelector } from "@reduxjs/toolkit";

export const getGeneral = (state) => state.general;

export const getAllEmployees = createSelector(
  getGeneral,
  (general) => general.allEmployees
);

export const getRedirectUrl = createSelector(
  getGeneral,
  (general) => general.redirectUrl
);

export const getIsLoginDialogOpened = createSelector(
  getGeneral,
  general => general.isLoginDialogOpened
);

export const getErrorInfo = createSelector(
  getGeneral,
  general => ({

      hasErrors: general.hasErrors,
      errorMessage: general.errorMessage
    })
)
