// TODO: Do I need them at all?
const getEmployees = require("./getEmployees");

const getProfileData = async (userId) => {
  const allEmployees = await getEmployees();
  const employee = allEmployees.find((employee) => employee.id === userId);

  return employee;
};

const setProfileData = (data) => {};

module.exports = { getProfileData, setProfileData };
