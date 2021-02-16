import { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import { useHistory, useLocation } from "react-router-dom";

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
    console.log("in effect");
    setUserInfo(false);
  }, []);

  const history = useHistory();

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
