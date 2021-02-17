import { useForm, Controller } from "react-hook-form";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import WizardButtonsContainer from "../common/WizardButtonsContainer";
import { makeStyles } from "@material-ui/core/styles";
import formSlice from "../../store/form";
import {useDispatch, useSelector} from "react-redux";
import {getForm} from "../../store/selectors/form";
import WizardStepContainer from "../common/WizardStepContainer";
import {useEffect} from "react";
import {fetchEmployees} from "../../store/actions/fetchEmployees";
import {getAllEmployees} from "../../store/selectors/general";

const useStyles = makeStyles({
  prevBtn: {
    // position: "absolute",
    // right: 12,
  },
  nextBtn: {
    position: "absolute",
    right: 12,
  },
});

const GroupManagement = ({ handleBack, handleNext }) => {
  const { register, handleSubmit, control, watch, errors } = useForm();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchEmployees());
  }, []);

  const existingFormData = useSelector((state) => getForm(state));
  const allEmployees = useSelector(state => getAllEmployees(state));

  console.log({allEmployees});

  const onSubmit = (data) => {
    dispatch(formSlice.actions.updateData(data));
    handleNext();
  };

  // TODO: do backend validation for form data, including field length, etc.

  // TODO: seems this is useful for both frontend validation and handling errors coming from backend:
  //  https://medium.com/@andresss/using-material-ui-with-react-hook-form-is-this-simple-d8383941fafe

  console.log("employee errors:", errors);

  const classes = useStyles();

  return (
    <>
      <WizardStepContainer title={'Create Group'}>
        <form onSubmit={handleSubmit(onSubmit)}>
          Coming soon
          {/*<Controller
            name="department"
            as={
              <TextField
                id="department"
                helperText={errors.department ? errors.department.message : null}
                label="Department"
                variant="outlined"
                error={!!errors.department}
              />
            }
            control={control}
            defaultValue={existingFormData.department || ''}
            rules={{
              required: true,
              pattern: {
                value: /^[A-Za-z]{1,30}$/i,
                message: "Invalid Department",
              },
            }}
          />*/}

          <WizardButtonsContainer>
            <Button
              variant="contained"
              color="primary"
              onClick={handleBack}
            >
              Previous
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit(onSubmit)}
            >
              Finish
            </Button>
          </WizardButtonsContainer>
        </form>
      </WizardStepContainer>
    </>
  );
};

export default GroupManagement;
