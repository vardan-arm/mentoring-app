const generateId = require("../utils/generateId");

const registerUser = (data) => {
  const employeesString = localStorage.getItem("employees");
  const employees = JSON.parse(employeesString);
  const userId = generateId();

  employees.push({
    id: userId,
    ...data,
  });

  // Store in local file; in real app this would be stored in DB
  localStorage.setItem("employees", JSON.stringify(employees));

  return userId;
};

module.exports = registerUser;
