require("./storageSetup");

const bodyParser = require("body-parser");
const express = require("express");

const getEmployees = require("./utils/getEmployees");
const { getProfileData, setProfileData } = require("./utils/getProfileData");
const registerUser = require("./utils/registerUser");
const validateUserData = require("./utils/validateUserData");
const { HTTP_STATUSES } = require("./utils/constants");
const { ok, unprocessableEntity, internalServerError } = HTTP_STATUSES;

const app = express();

// app.get("/api/users", (req, res) => {
//   res.send(["user 1", "user 2"]);
// });
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api/employees", async (req, res) => {
  const employees = await getEmployees();

  if (employees !== null) {
    res.send({ data: employees });
  } else {
    return res
      .status(internalServerError.code)
      .send({ error: internalServerError.message });
  }
});

app.post("/api/registerUser", async (req, res) => {
  const data = req.body;
  const validationError = validateUserData(data);

  if (!validationError) {
    const userId = registerUser(data);
    const user = await getProfileData(userId);

    res.status(ok.code).send({ data: { user } });
  } else {
    res
      .status(unprocessableEntity.code)
      .send({ error: unprocessableEntity.message });
  }
});


app.post('/api/updateUser', async (req, res) => {
  try {
    const data = req.body;
    console.log('received data:', data);
    const storedUser = await getProfileData(data.id);



    const employeesString = localStorage.getItem("employees");
    let employees = JSON.parse(employeesString);
    const userIndex = employees.findIndex(empl => empl.id === storedUser.id);

    const updatedUser = {
      ...storedUser,
      ...data
    };

    employees.splice(userIndex, 1, updatedUser);

    // Store in local file; in real app this would be stored in DB
    localStorage.setItem("employees", JSON.stringify(employees));

    res.status(ok.code).send({ data: { user: updatedUser } });
  } catch {
    res
      .status(internalServerError.code)
      .send({ error: internalServerError.message });
  }

});

app.post("/api/login", async (req, res) => {
  const employees = await getEmployees();
  if (employees) {
    // Imitation of searching user in DB
    const loggedInUser = employees.find(
      (employee) => employee.email === req.body.email
    );

    if (loggedInUser) {
      // (Do backend-related stuff for login here...)
      // and send user data to frontend
      res.status(ok.code).send({ data: loggedInUser });
    } else {
      const { unauthorized } = HTTP_STATUSES;
      res.status(unauthorized.code).send({ error: unauthorized.message });
    }
  } else {
    res
      .status(internalServerError.code)
      .send({ error: internalServerError.message });
  }
});

// app.get("/api/profileData", (req, res) => {
app.get("/api/profileData/:userId", async (req, res) => {
  const { userId } = req.params;

  const profileData = await getProfileData(userId);

  if (profileData) {
    res.status(HTTP_STATUSES.ok.code).send({ data: profileData });
  } else {
    res
      .status(HTTP_STATUSES.internalServerError.code)
      .send({ error: HTTP_STATUSES.internalServerError.message });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT);
