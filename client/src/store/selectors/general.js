import {createSelector} from "@reduxjs/toolkit";

export const getForm = state => state.form;

export const getAllEmployees = createSelector(getForm, employees => employees);
