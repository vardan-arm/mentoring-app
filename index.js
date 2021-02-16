require("./storageSetup");
const getEmployees = require("./utils/getEmployees");
const { getProfileData, setProfileData } = require("./utils/getProfileData");
const { HTTP_STATUSES } = require("./utils/constants");

const express = require("express");
const app = express();

// app.get("/api/users", (req, res) => {
//   res.send(["user 1", "user 2"]);
// });

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

app.post("/api/register", (req, res) => {
  // TODO: Validate received data
  const data = req.data;

  // TODO: remove this hardcoding
  if (true) {
    // all data is validated

    const userId = registerUser(data); // remember that for `userId` we use his email

    res.redirect(`/profile/${userId}`);
    const { ok } = HTTP_STATUSES;
    res.status(ok.code).send({ data: "" });
  } else {
    const { unprocessableEntity } = HTTP_STATUSES;
    res
      .status(unprocessableEntity.code)
      .send({ error: unprocessableEntity.message });
  }
  const result = {};
  res.send();
});

app.post("/api/login", async (req, res) => {
  const employees = await getEmployees();

  if (employees) {
    // Imitation of searching user in DB
    const loggedInUser = employees.find(
      (employee) => employee.email === req.email
    );
    if (loggedInUser) {
      res.redirect("/profile");
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

app.get("/api/profileData", (req, res) => {
  const { userId } = req;

  const profileData = getProfileData(userId);
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
