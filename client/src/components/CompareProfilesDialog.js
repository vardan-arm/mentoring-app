import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { doLogin } from "../store/actions/doLogin";
import { EMAIL_VALIDATION_REGEX } from "../utils/constants";
import { Controller, useForm } from "react-hook-form";
import {
  getErrorInfo,
  getIsLoginDialogOpened,
} from "../store/selectors/general";
import generalSlice from "../store/general";
import ProfileDetails from "./ProfileDetails";

const useStyles = makeStyles({
  inputField: {
    "& #email-helper-text": {
      color: "#f44336",
    },
  },
});

const CompareProfilesialog = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(generalSlice.actions.setIsLoginDialogOpened(false));
  };

  const isCompareProfilesDialogOpened = useSelector((state) =>
    getIsLoginDialogOpened(state)
  );
  // const generalErrorInfo = useSelector((state) => getErrorInfo(state));

  // const { control, errors } = useForm();

  return (
    <div>
      <Dialog
        fullWidth={true}
        open={isCompareProfilesDialogOpened}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        className={classes.container}
      >
        <DialogTitle id="form-dialog-title">Compare Profiles</DialogTitle>
        <DialogContent>
          <ProfileDetails>Profile 1</ProfileDetails>
          <ProfileDetails>Profile 2</ProfileDetails>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CompareProfilesialog;
