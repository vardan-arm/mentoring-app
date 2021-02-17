const generateId = require("../utils/generateId");

const registerUser = (data) => {
  // console.log({data});
  // const { group, ...rest } = data;

  const employeesString = localStorage.getItem("employees");
  const employees = JSON.parse(employeesString);
  const userId = generateId();

  employees.push({
    id: userId,
    // ...rest,
    // group
    ...data,
  });

  // Store in local file; in real app this would be stored in DB
  localStorage.setItem("employees", JSON.stringify(employees));

  return userId;
};

module.exports = registerUser;
