import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import { Link, useHistory, useLocation } from "react-router-dom";
import { batch, useDispatch, useSelector } from "react-redux";
import { getRedirectUrl } from "../store/selectors/general";
import generalSlice from "../store/general";
import { getUser } from "../store/selectors/user";
import LoginDialog from "./LoginDialog";
import userSlice from "../store/user";
import { isLocationAllowed } from "../utils/isLocationAllowed";
import formSlice from "../store/form";

const useStyles = makeStyles({
  container: {
    margin: "12px auto 24px",
    textAlign: "right",
    position: "relative",
  },
  home: {
    // position: "absolute",
    textDecoration: "none",
  },
  btn: {
    margin: "12px 16px",
  },
});

const Header = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const location = useLocation();
  const history = useHistory();

  const userInfo = useSelector((state) => getUser(state));

  // Check whether the non-logged in user can visit current page
  if (!userInfo.id && !isLocationAllowed(location.pathname)) {
    history.replace("/");
  }

  const redirectUrl = useSelector((state) => getRedirectUrl(state));
  if (redirectUrl) {
    dispatch(generalSlice.actions.setRedirectUrl(""));
    history.push(redirectUrl);
  }

  let output = "";

  if (location.pathname === "/registration") {
    return (
      <div>
        <Link to={"/"} className={classes.home}>
          <Button variant="contained" color="primary" className={classes.btn}>
            Home
          </Button>
        </Link>
      </div>
    );
  } else if (userInfo.id) {
    // logged in
    output = (
      <>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => {
            batch(() => {
              dispatch(userSlice.actions.logout());
              dispatch(formSlice.actions.clearData());
            });
            history.replace("/");
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
            dispatch(generalSlice.actions.setIsLoginDialogOpened(true));
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
          }}
          className={classes.btn}
        >
          Register
        </Button>
      </>
    );
  }

  return (
    <Paper className={classes.container} elevation={1}>
      <Grid>{output}</Grid>
      <LoginDialog />
    </Paper>
  );
};

export default Header;
