import Paper from "@material-ui/core/Paper";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { makeStyles } from "@material-ui/core/styles";
// import Stepper from '@material-ui/core/Stepper';
// import Step from '@material-ui/core/Step';
// import StepLabel from '@material-ui/core/StepLabel';
import Typography from "@material-ui/core/Typography";
import ProfileInfo from "./ProfileInfo";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Stepper from "@material-ui/core/Stepper";
import EmploymentInfo from "./EmploymentInfo";
import GroupManagement from "./GroupManagement";

const useStyles = makeStyles((theme) => ({
  container: {
    margin: "12px 16px 24px",
  },
  title: {
    padding: 12,
    fontSize: 24,
  },
}));

const Registration = () => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);

  const steps = ["Basic Information", "Employment Information", "Create Group"];
  console.log({ activeStep });
  return (
    <Paper className={classes.container}>
      <Typography className={classes.title}>Registration</Typography>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      {activeStep === 0 && (
        <ProfileInfo
          handleNext={() => setActiveStep((activeStep) => activeStep + 1)}
        />
      )}
      {activeStep === 1 && (
        <EmploymentInfo
          handleBack={() => setActiveStep((activeStep) => activeStep - 1)}
          handleNext={() => setActiveStep((activeStep) => activeStep + 1)}
        />
      )}
      {activeStep === 2 && (
        <GroupManagement
          handleBack={() => setActiveStep((activeStep) => activeStep - 1)}
          handleNext={() => {
            // TODO: here we need to do API call and save all data
            setActiveStep((activeStep) => activeStep + 1)
          }}
        />
      )}
    </Paper>
  );
};

export default Registration;
