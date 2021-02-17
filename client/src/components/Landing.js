import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  container: {
    textAlign: "center",
  },
});

const Landing = () => {
  const classes = useStyles();

  return <h1 className={classes.container}>Landing page</h1>;
};

export default Landing;
