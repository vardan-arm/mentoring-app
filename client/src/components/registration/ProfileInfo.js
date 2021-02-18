import { useForm, Controller } from "react-hook-form";
import TextField from "@material-ui/core/TextField";
import WizardButtonsContainer from "../common/WizardButtonsContainer";
import WizardStepContainer from "../common/WizardStepContainer";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import formSlice from "../../store/form";
import { getForm } from "../../store/selectors/form";
import { EMAIL_VALIDATION_REGEX } from "../../utils/constants";

const useStyles = makeStyles({
  inputField: {
    marginRight: 16,
    marginLeft: 16,
  },
});

const ProfileInfo = ({ handleNext }) => {
  const { handleSubmit, control, errors } = useForm();

  const classes = useStyles();
  const dispatch = useDispatch();

  const existingFormData = useSelector((state) => getForm(state));

  const onSubmit = (data) => {
    dispatch(formSlice.actions.updateData(data));
    handleNext();
  };

  return (
    <>
      <WizardStepContainer title={"Basic Information"}>
        <div>
          <form>
            <Controller
              name="first_name"
              as={
                <TextField
                  id="first_name"
                  helperText={
                    errors.first_name ? errors.first_name.message : null
                  }
                  label="First Name"
                  variant="outlined"
                  error={!!errors.first_name}
                  className={classes.inputField}
                />
              }
              control={control}
              defaultValue={existingFormData.first_name || ""}
              rules={{
                required: {
                  value: true,
                  message: "You should provide First Name",
                },
                pattern: {
                  value: /^[A-Za-z]{1,20}$/i,
                  message: "Invalid First Name",
                },
              }}
            />

            <Controller
              name="last_name"
              as={
                <TextField
                  id="last_name"
                  helperText={
                    errors.last_name ? errors.last_name.message : null
                  }
                  label="Last Name"
                  variant="outlined"
                  error={!!errors.last_name}
                  className={classes.inputField}
                />
              }
              control={control}
              defaultValue={existingFormData.last_name || ""}
              rules={{
                required: {
                  value: true,
                  message: "You should provide Last Name",
                },
                pattern: {
                  value: /^[A-Za-z]{1,20}$/i,
                  message: "Invalid Last Name",
                },
              }}
            />

            <Controller
              name="age"
              as={
                <TextField
                  id="age"
                  helperText={errors.age ? errors.age.message : null}
                  label="Age"
                  variant="outlined"
                  error={!!errors.age}
                  type="number"
                  className={classes.inputField}
                />
              }
              control={control}
              defaultValue={existingFormData.age || ""}
              rules={{
                required: {
                  value: true,
                  message: "You should provide Age",
                },
                min: { value: 20, message: "Age should be at least 20" },
                max: { value: 99, message: "Age should be up to 99" },
              }}
            />

            <Controller
              name="email"
              as={
                <TextField
                  id="email"
                  helperText={errors.email ? errors.email.message : null}
                  label="Email"
                  variant="outlined"
                  error={!!errors.email}
                  className={classes.inputField}
                />
              }
              control={control}
              defaultValue={existingFormData.email || ""}
              rules={{
                required: {
                  value: true,
                  message: "You should provide Email",
                },
                pattern: {
                  value: EMAIL_VALIDATION_REGEX,
                  message: "Invalid Email",
                },
              }}
            />

            <WizardButtonsContainer>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit(onSubmit)}
                className={classes.nextBtn}
              >
                Next
              </Button>
            </WizardButtonsContainer>
          </form>
        </div>
      </WizardStepContainer>
    </>
  );
};

export default ProfileInfo;
