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

const useStyles = makeStyles({
  inputField: {
    "& #email-helper-text": {
      color: "#f44336",
    },
  },
});

const LoginDialog = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(generalSlice.actions.setIsLoginDialogOpened(false));
  };

  const isLoginDialogOpened = useSelector((state) =>
    getIsLoginDialogOpened(state)
  );
  const generalErrorInfo = useSelector((state) => getErrorInfo(state));

  const onSubmit = (email) => {
    dispatch(doLogin(email));
  };

  const { handleSubmit, control, errors } = useForm();

  return (
    <div>
      <Dialog
        fullWidth={true}
        open={isLoginDialogOpened}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        className={classes.container}
      >
        <DialogTitle id="form-dialog-title">Login</DialogTitle>
        <DialogContent>
          <DialogContentText>Login with your email</DialogContentText>

          <form>
            <Controller
              name="email"
              as={
                <TextField
                  autoFocus
                  onKeyDown={(e) => {
                    // MUI is focused on other element when pressing "Enter". Just ignore the keypress for now.
                    if (e.code === "Enter") {
                      e.preventDefault();
                    }
                  }}
                  id="email"
                  helperText={
                    errors.email
                      ? errors.email.message
                      : generalErrorInfo.errorMessage || ""
                  }
                  label="Email"
                  variant="outlined"
                  error={!!errors.email}
                  className={classes.inputField}
                  fullWidth
                  margin="dense"
                />
              }
              control={control}
              defaultValue={""}
              rules={{
                required: {
                  value: true,
                  message: "Please provide correct Email",
                },
                pattern: {
                  value: EMAIL_VALIDATION_REGEX,
                  message: "Invalid Email",
                },
              }}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit(onSubmit)} color="primary">
            Login
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default LoginDialog;
