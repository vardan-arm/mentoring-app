const csv = require("csv-parser");
const fs = require("fs");

const generateId = require("../utils/generateId");

// const getEmployees = async () => {
const getEmployees = () => {
  return new Promise((resolve) => {
    try {
      let employees = [];
      const cachedEmployees = localStorage.getItem("employees");

      if (cachedEmployees) {
        employees = JSON.parse(cachedEmployees);

        resolve(employees);
      } else {
        // no previously stored data, get from the file (or from DB in real environment)
        fs.createReadStream("./mocks/employees cvs.csv")
          .pipe(csv())
          .on("data", (row) => {
            employees.push({
              ...row,
              id: generateId(),
            });
          })
          .on("end", () => {
            // Cache results locally
            localStorage.setItem("employees", JSON.stringify(employees));

            resolve(employees);
          });
      }
    } catch {
      resolve(null);
    }
  });
};

module.exports = getEmployees;
