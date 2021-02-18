const MAX_ALLOWED_USERS_IN_GROUP = require("./constants")
  .MAX_ALLOWED_USERS_IN_GROUP;

const validateUserData = ({
  first_name,
  last_name,
  email,
  age,
  department,
  jobTitle,
  group,
}) => {
  const errorMessage = "Please provide all required fields with correct format";
  let error = "";

  const nameRegex = /^[A-Za-z]{1,20}$/i;
  const emailRegex = /^([\w\!\#$\%\&\'\*\+\-\/\=\?\^\`{\|\}\~]+\.)*[\w\!\#$\%\&\'\*\+\-\/\=\?\^\`{\|\}\~]+@((((([a-z0-9]{1}[a-z0-9\-]{0,62}[a-z0-9]{1})|[a-z])\.)+[a-z]{2,6})|(\d{1,3}\.){3}\d{1,3}(\:\d{1,5})?)$/i;
  const jobRegex = /^[a-zA-Z0-9_ ]{1,30}$/i;

  if (!first_name || !nameRegex.test(first_name)) {
    error = errorMessage;

    return error;
  }

  if (!last_name || !nameRegex.test(last_name)) {
    error = errorMessage;

    return error;
  }

  if (!email || !emailRegex.test(email)) {
    error = errorMessage;

    return error;
  }

  if (!age || age < 20 || age > 99) {
    error = errorMessage;

    return error;
  }

  if (!jobTitle || !jobRegex.test(jobTitle)) {
    error = errorMessage;

    return error;
  }

  if (!department || !jobRegex.test(department)) {
    error = errorMessage;

    return error;
  }

  if (!Array.isArray(group) || group.length > MAX_ALLOWED_USERS_IN_GROUP) {
    error = errorMessage;
  }

  return error;
};

module.exports = validateUserData;
