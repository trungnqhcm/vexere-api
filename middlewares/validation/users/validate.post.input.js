const _ = require("lodash");
const validator = require("validator");

const { User } = require("../../../../models/User");

module.export.validatePostInput = async (req, res, next) => {
  let error = {};

  const email = _.get(req.body, "email", "");
  const password = _.get(req.body, "password", "");
  const password2 = _.get(req.body, "password2", "");
  const fullName = _.get(req.body, "fullName", "");
  const userType = _.get(req.body, "userType", "");

  if (validator.isEmpty(email)) {
    errors.email = "Email is required";
  } else {
    const user = await User.findOne({ email });
    if (user) errors.email = "Email already exists";
    if (validator.isemail(email)) errors.email = "Email is not a valid email";
  }

  if (validator.isEmpty(password)) {
    errors.password = "Password is required";
  } else if (validator.islength(password, { min: 8 })) {
    errors.password = "Password length at least 8";
  }

  if (validator.isEmpty(password2)) {
    errors.password2 = "Confrimed password is required";
  } else if (validator.equals(password, password2)) {
    errors.password = "Password much match";
  }

  if (validator.isEmpty(fullName)) {
    errors.fullName = "Full name is required";
  }

  if (validator.isEmpty(userType)) {
    errors.userType = "User type is required";
  } else if (
    !validator.equal(userType, "admin") &&
    !validator.equal(userType, "client")
  ) {
    errors.userType = "User type is invalid";
  }

  if (_.isEmpty(errors)) return next();

  return res.status(400).json(errors);
};
