import { useForm, Controller } from "react-hook-form";
import TextField from "@material-ui/core/TextField";

const ProfileInfo = () => {
  const { register, handleSubmit, control, watch, errors } = useForm();

  const onSubmit = (data) => {
    console.log(JSON.stringify(data));
  };

  // TODO: do backend validation for form data, including field length, etc.

  // TODO: seems this is useful for both frontend validation and handling errors coming from backend:
  //  https://medium.com/@andresss/using-material-ui-with-react-hook-form-is-this-simple-d8383941fafe

  console.log({ errors });
  return (
    <>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
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
            defaultValue=""
            rules={{
              required: true,
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
            defaultValue=""
            rules={{
              required: true,
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
            defaultValue=""
            rules={{
              required: true,
              min: { value: 20, message: "Age should be at least 20" },
              max: { value: 99, message: "Age should be up to 99" },
            }}
          />
          <input type="submit" />
        </form>
      </div>
    </>
  );
};

export default ProfileInfo;
