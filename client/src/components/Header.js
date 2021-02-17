import { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import { useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getRedirectUrl } from "../store/selectors/general";
import generalSlice from "../store/general";

// TODO: Use `stepper` for user's steps

const useStyles = makeStyles({
  container: {
    margin: "12px auto 24px",
    textAlign: "right",
  },
  btn: {
    margin: "12px 16px",
  },
});

const Header = () => {
  const [userInfo, setUserInfo] = useState(null);

  const classes = useStyles();
  const location = useLocation();

  useEffect(() => {
    setUserInfo(false);
  }, []);

  const dispatch = useDispatch();
  const history = useHistory();

  const redirectUrl = useSelector((state) => getRedirectUrl(state));
  if (redirectUrl) {
    dispatch(generalSlice.actions.setRedirectUrl(""));
    history.push(redirectUrl);
  }

  let output = "";
  // if (userInfo === null) {
  if (location.pathname === "/registration" || userInfo === null) {
    return "";
  } else if (userInfo === false) {
    output = (
      <>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            console.log("login action");
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
  } else {
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
  }

  return (
    <Paper className={classes.container} elevation={1}>
      <Grid>{output}</Grid>
    </Paper>
  );
};

export default Header;
