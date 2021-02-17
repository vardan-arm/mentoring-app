import { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import { useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getRedirectUrl } from "../store/selectors/general";
import generalSlice from "../store/general";
import { getUser } from "../store/selectors/user";
import LoginDialog from "./LoginDialog";

// TODO: Use `stepper` for user's steps

const useStyles = makeStyles({
  container: {
    margin: "12px auto 24px",
    textAlign: "right",
    // width: '70%'
  },
  btn: {
    margin: "12px 16px",
  },
});

const Header = () => {
  // const [userInfo, setUserInfo] = useState(null);

  const classes = useStyles();
  const location = useLocation();

  // const [openLoginDialog, setOpenLoginDialog] = useState(false);

  const userInfo = useSelector((state) => getUser(state));

  /*useEffect(() => {

    setUserInfo(false);
  }, []);*/

  const dispatch = useDispatch();
  const history = useHistory();

  const redirectUrl = useSelector((state) => getRedirectUrl(state));
  if (redirectUrl) {
    dispatch(generalSlice.actions.setRedirectUrl(""));
    history.push(redirectUrl);
  }

  let output = "";

  // if (location.pathname === "/registration" || userInfo === null) {
  if (location.pathname === "/registration") {
    return "";
  } else if (userInfo.id) {
    // logged in
    output = (
      <>
        <div>Hi, {userInfo.first_name}!</div>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => {
            console.log("Logout action");
          }}
          className={classes.btn}
        >
          Logout
        </Button>
      </>
    );
  } else {
    output = (
      <>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            // console.log("login action");
            // setOpenLoginDialog(true);
            dispatch(generalSlice.actions.setIsLoginDialogOpened(true))
          }}
          className={classes.btn}
        >
          Login
        </Button>
        or
        <Button
          variant="contained"
          color="secondary"
          onClick={() => {
            history.push("/registration");
            // console.log("registration action");
          }}
          className={classes.btn}
        >
          Register
        </Button>
      </>
    );
  } /*else {
    output = (
      <>
        <div>Hi, USER_NAME !</div>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => {
            console.log("Logout action");
          }}
          className={classes.btn}
        >
          Logout
        </Button>
      </>
    );
  }*/

  return (
    <Paper className={classes.container} elevation={1}>
      <Grid>{output}</Grid>
        <LoginDialog />
    </Paper>
  );
};

export default Header;
