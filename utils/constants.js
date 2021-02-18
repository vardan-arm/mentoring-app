const HTTP_STATUSES = {
  ok: {
    code: 200,
    message: "ok",
  },
  unauthorized: {
    code: 401,
    message: "Incorrect username/password",
  },
  unprocessableEntity: {
    code: 422,
    message: "Please ensure you have filled all required information.",
  },
  internalServerError: {
    code: 500,
    message: "Something went wrong. Please try again later!",
  },
};

const MAX_ALLOWED_USERS_IN_GROUP = 5; // this should be in one place actually and possibly be sent to client if required

module.exports = {
  HTTP_STATUSES,
  MAX_ALLOWED_USERS_IN_GROUP,
};
