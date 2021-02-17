require("./storageSetup");

const bodyParser = require("body-parser");
const express = require("express");

const getEmployees = require("./utils/getEmployees");
const { getProfileData, setProfileData } = require("./utils/getProfileData");
const registerUser = require("./utils/registerUser");
const validateUserData = require("./utils/validateUserData");
const { HTTP_STATUSES } = require("./utils/constants");

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
    const { internalServerError } = HTTP_STATUSES;
    return res
      .status(internalServerError.code)
      .send({ error: internalServerError.message });
  }
});

app.post("/api/saveUserData", (req, res) => {
  const data = req.body;
  const validationError = validateUserData(data);

  if (!validationError) {
    const userId = registerUser(data);

    const { ok } = HTTP_STATUSES;
    res.status(ok.code).send({ data: { userId } });
  } else {
    const { unprocessableEntity } = HTTP_STATUSES;
    res
      .status(unprocessableEntity.code)
      .send({ error: unprocessableEntity.message });
  }
});

app.post("/api/login", async (req, res) => {
  const employees = await getEmployees();
// console.log('employees', employees);
  console.log('>>>>', req.body.email);
  if (employees) {
    // Imitation of searching user in DB
    const loggedInUser = employees.find(
      (employee) => employee.email === req.body.email
    );

    if (loggedInUser) {
      // res.redirect("/profile");
      console.log({ loggedInUser });
      // (Do backend-related stuff for login here...)
      // and send user data to frontend
      // const userId = registerUser(loggedInUser);

      const { ok } = HTTP_STATUSES;
      res.status(ok.code).send({ data: loggedInUser });
    } else {
      const { unauthorized } = HTTP_STATUSES;
      res.status(unauthorized.code).send({ error: unauthorized.message });
    }
  } else {
    const { internalServerError } = HTTP_STATUSES;
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
