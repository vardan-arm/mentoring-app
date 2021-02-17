import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  btnContainer: {
    display: 'flex',
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',

    // Show Next/Previous buttons in right order
    '& :nth-child(1)': { order: 2 },
    '& :nth-child(2)': { order: 1 }
  },
}));

const WizardButtonsContainer = ({ children }) => {
  const classes = useStyles();

  return <div className={classes.btnContainer}>{children}</div>;
};

export default WizardButtonsContainer;
