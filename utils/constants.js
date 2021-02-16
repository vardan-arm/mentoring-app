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

module.exports = {
  HTTP_STATUSES,
};
