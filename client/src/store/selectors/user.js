import { createSelector } from "@reduxjs/toolkit";

export const getUser = (state) => state.user;
export const getUserGroup = createSelector(getUser, (user) => user.group || []);
