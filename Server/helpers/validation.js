const { validationResult, check } = require("express-validator");
const db = require("../db");
const validateUser = [
  check("image").isLength({ min: 1 }).withMessage("Image is required"),
  check("name").isLength({ min: 1 }).withMessage("Name is required"),
  check("email")
    .isEmail()
    .normalizeEmail({ gmail_remove_dots: true })
    .custom(async (email) => {
      await checkDuplicate("email", email);
      return true;
    })
    .withMessage("Email is invalid or already exists"),
  check("number")
    .isNumeric()
    .isLength({ min: 10, max: 10 })
    .custom(async (number) => {
      await checkDuplicate("number", number);
      return true;
    })
    .withMessage("Number is less than 10 digits or number already used"),
  check("DateOfBirth")
    .isISO8601()
    .isLength({ min: 10, max: 10 })
    .withMessage("Date of Birth must be in valid format (YYYY-MM-DD)"),
];

const validateUpdatedUser = [
  check("image").isLength({ min: 1 }).withMessage("Image is required"),
  check("name").isLength({ min: 1 }).withMessage("Name is required"),
  check("email")
    .isEmail()
    .normalizeEmail({ gmail_remove_dots: true })
    .withMessage("Email is invalid "),
  check("number")
    .isNumeric()
    .isLength({ min: 10, max: 10 })
    .withMessage("Number is less than 10 digits or number already used"),
  check("DateOfBirth")
    .isISO8601()
    .isLength({ min: 10, max: 10 })
    .withMessage("Date of Birth must be in valid format (YYYY-MM-DD)"),
];

const checkDuplicate = async (type, attribute) => {
  const [[result]] = await db.query(`SELECT id FROM users WHERE ${type} = ?`, [
    attribute,
  ]);
  if (result !== undefined) {
    throw new Error();
  }
};

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }

  const extractedErrors = {};
  errors.array().forEach((err) => {
    if (!extractedErrors[err.param]) {
      extractedErrors[err.param] = [];
    }
    extractedErrors[err.param].push(err.msg);
  });

  return res.status(422).json({
    errors: extractedErrors,
  });
};

module.exports = {
  validateUpdatedUser,
  validateUser,
  validate,
};
