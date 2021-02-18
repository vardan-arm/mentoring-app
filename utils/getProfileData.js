const getEmployees = require("./getEmployees");

const getProfileData = async (userId) => {
  const allEmployees = await getEmployees();
  const employee = allEmployees.find((employee) => employee.id === userId);

  return employee;
};

module.exports = { getProfileData };
