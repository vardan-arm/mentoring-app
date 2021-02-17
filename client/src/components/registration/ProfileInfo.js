import { useForm, Controller } from "react-hook-form";
import {useEffect, useState} from "react";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import WizardButtonsContainer from "../common/WizardButtonsContainer";
import WizardStepContainer from '../common/WizardStepContainer';
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import userSlice from "../../store/user";
import formSlice from "../../store/form";
import { getForm } from "../../store/selectors/form";
import Paper from "@material-ui/core/Paper";
import { fetchEmployees} from "../../store/actions/fetchEmployees";

const useStyles = makeStyles({
  // container: {
  //   margin: 16,
  //   padding: 16
  // },
  btnContainer: {
    /*
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
    */
    position: "relative",
  },
  nextBtn: {
    // position: "absolute",
    // right: 12,
  },
});

const ProfileInfo = ({ handleNext }) => {
  const {
    register,
    handleSubmit,
    control,
    watch,
    errors,
    submit: formSubmit,
  } = useForm();



  const classes = useStyles();
  const dispatch = useDispatch();

  const existingFormData = useSelector((state) => getForm(state));

  console.log({ existingFormData });
  const onSubmit = (data) => {
    dispatch(formSlice.actions.updateData(data));
    handleNext();
  };

  // TODO: do backend validation for form data, including field length, etc.

  // TODO: seems this is useful for both frontend validation and handling errors coming from backend:
  //  https://medium.com/@andresss/using-material-ui-with-react-hook-form-is-this-simple-d8383941fafe

  console.log({ errors });

  const [gender, setGender] = useState(0);

  const handleGenderChange = (e) => {
    console.log("value", e.target.value);
    setGender(e.target.value);
  };

  // TODO: create a separate component to avoid components duplication below

  return (
    <>
      <WizardStepContainer title={'Basic Information'}>
      <div>
        <form>
          <Controller
            name="firstName"
            as={
              <TextField
                id="firstName"
                helperText={errors.firstName ? errors.firstName.message : null}
                label="First Name"
                variant="outlined"
                error={!!errors.firstName}
              />
            }
            control={control}
            defaultValue={existingFormData.firstName || ''}
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
            name="lastName"
            as={
              <TextField
                id="lastName"
                helperText={errors.lastName ? errors.lastName.message : null}
                label="Last Name"
                variant="outlined"
                error={!!errors.lastName}
              />
            }
            control={control}
            defaultValue={existingFormData.lastName || ''}
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
              />
            }
            control={control}
            defaultValue={existingFormData.age || ''}
            rules={{
              required: {
                value: true,
                message: "You should provide Age",
              },
              min: { value: 20, message: "Age should be at least 20" },
              max: { value: 99, message: "Age should be up to 99" },
            }}
          />
          <br />

          <Controller
            name="email"
            as={
              <TextField
                id="email"
                helperText={errors.email ? errors.email.message : null}
                label="Email"
                variant="outlined"
                error={!!errors.email}
              />
            }
            control={control}
            defaultValue={existingFormData.email || ''}
            rules={{
              required: {
                value: true,
                message: "You should provide Email",
              },
              pattern: {
                value: /^([\w\!\#$\%\&\'\*\+\-\/\=\?\^\`{\|\}\~]+\.)*[\w\!\#$\%\&\'\*\+\-\/\=\?\^\`{\|\}\~]+@((((([a-z0-9]{1}[a-z0-9\-]{0,62}[a-z0-9]{1})|[a-z])\.)+[a-z]{2,6})|(\d{1,3}\.){3}\d{1,3}(\:\d{1,5})?)$/i,
                message: "Invalid Email",
              },
            }}
          />

          {/*
          <Controller
            name="gender"
            as={
              <>
              <FormControl fullWidth={true}>
                <InputLabel htmlFor="gender" id="demo-simple-select-label">Age</InputLabel>
                <Select
                  labelId="Gender"
                  id="gender"
                  // defaultValue={gender || 0}
                  defaultValue={''}
                  // value={gender}
                  onChange={handleGenderChange}
                  // onChange={() => {}}
                >
                  <MenuItem key={0} value={''}>
                    <em>None</em>
                  </MenuItem>
                  <MenuItem key={1} value={1}>
                    Male
                  </MenuItem>
                  <MenuItem key={2} value={2}>
                    Female
                  </MenuItem>
                </Select>
                </FormControl>
              </>
            }
            control={control}
            defaultValue=""
            rules={{
              required: {
                value: true,
                message: "You should provide Gender",
              },
              // min: { value: 20, message: "Age should be at least 20" },
              // max: { value: 99, message: "Age should be up to 99" },
            }}
          />
          */}

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
