import { createSelector } from "@reduxjs/toolkit";

export const getUser = (state) => state.user;
/*
export const getUserGroup = createSelector(
  getUser,
  (_, isDone) => isDone, // passed parameter
  (userData, param) => {
    return userData.group;
  }
);
*/
