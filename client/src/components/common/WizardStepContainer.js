import Paper from "@material-ui/core/Paper";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles({
  container: {
    margin: 16,
    padding: 16
  },
});

const WizardStepContainer = ({title, children}) => {
  const classes = useStyles();

  return (
    <Paper elevation={2} className={classes.container}>
      <h3>{title}</h3>
      {children}
    </Paper>
  );
}

export default WizardStepContainer;
