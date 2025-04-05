//jaden binette

const validate = require("validate.js");

const validateUserInput = (req, res, next) => {
  // Define validation constraints
  const constraints = {
    firstName: {
      presence: true,
      type: "string",
      length: { minimum: 1 }, // Ensures at least one character
    },
    lastName: {
      presence: true,
      type: "string",
      length: { minimum: 1 }, // Ensures at least one character
    },
    email: {
      presence: true,
      email: true, // Validates proper email format
    },
    accountType: {
      presence: true,
      inclusion: ["standard", "premium", "admin"], // Ensures it's one of these values
    },
    dateCreated: {
      presence: true,
      datetime: true, // Validates it's a valid date-time
    },
    dateUpdated: {
      presence: true,
      datetime: true, // Validates it's a valid date-time
    },
    cartId: {
      presence: true,
      type: "string", // First, ensure it's a string
      format: {
        pattern: /^[0-9a-fA-F]{24}$/, // Regular expression for MongoDB ObjectID
        message: "must be a valid MongoDB ObjectID",
      },
    },
  };

  // Validate request body
  const validationErrors = validate(req.body, constraints);

  if (validationErrors) {
    // Respond with validation errors
    return res.status(400).json({
      message: "Validation failed",
      errors: validationErrors,
    });
  }

  // If validation passes, proceed to the next middleware/controller
  next();
};

module.exports = validateUserInput;
