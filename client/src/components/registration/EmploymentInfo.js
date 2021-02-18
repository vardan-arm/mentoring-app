import { useForm, Controller } from "react-hook-form";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import WizardButtonsContainer from "../common/WizardButtonsContainer";
import { makeStyles } from "@material-ui/core/styles";
import formSlice from "../../store/form";
import { useDispatch, useSelector } from "react-redux";
import { getForm } from "../../store/selectors/form";
import WizardStepContainer from "../common/WizardStepContainer";

const useStyles = makeStyles({
  inputField: {
    marginRight: 16,
    marginLeft: 16,
  },
});

const EmploymentInfo = ({ handleBack, handleNext }) => {
  const classes = useStyles();

  const { handleSubmit, control, errors } = useForm();

  const dispatch = useDispatch();

  const existingFormData = useSelector((state) => getForm(state));

  const onSubmit = (data) => {
    dispatch(formSlice.actions.updateData(data));
    handleNext();
  };

  return (
    <>
      <WizardStepContainer title={"Employment Information"}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="department"
            as={
              <TextField
                id="department"
                helperText={
                  errors.department ? errors.department.message : null
                }
                label="Department"
                variant="outlined"
                error={!!errors.department}
                className={classes.inputField}
              />
            }
            control={control}
            defaultValue={existingFormData.department || ""}
            rules={{
              required: true,
              pattern: {
                value: /^[a-zA-Z0-9_ ]{1,30}$/i,
                message: "Invalid Department",
              },
            }}
          />

          <Controller
            name="jobTitle"
            as={
              <TextField
                id="jobTitle"
                helperText={errors.jobTitle ? errors.jobTitle.message : null}
                label="Job Title"
                variant="outlined"
                error={!!errors.jobTitle}
                className={classes.inputField}
              />
            }
            control={control}
            defaultValue={existingFormData.jobTitle || ""}
            rules={{
              required: true,
              pattern: {
                value: /^[a-zA-Z0-9_ ]{1,30}$/i,
                message: "Invalid Job Title",
              },
            }}
          />

          <WizardButtonsContainer>
            <Button variant="contained" color="primary" onClick={handleBack}>
              Previous
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit(onSubmit)}
            >
              Next
            </Button>
          </WizardButtonsContainer>
        </form>
      </WizardStepContainer>
    </>
  );
};

export default EmploymentInfo;
