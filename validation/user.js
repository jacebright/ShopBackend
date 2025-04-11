//Jaden Binette

const validate = require('validate.js');

const validateUserInput = (req, res, next) => {
  // Define validation constraints
  const constraints = {
    firstName: {
      presence: true,
      type: 'string',
      length: { minimum: 1 }, // At least one character
    },
    lastName: {
      presence: true,
      type: 'string',
      length: { minimum: 1 }, // At least one character
    },
    email: {
      presence: true,
      email: true, // Validates email format
    },
    favoriteColor: {
      presence: true,
      type: 'string', // Ensures it's a string
    },
    accountType: {
      presence: true,
      inclusion: ['Client', 'Admin', 'Standard'], // Validates against expected values
    },
    dateCreated: {
      presence: true,
      format: {
        pattern: /^\d{2}\/\d{2}\/\d{4}$/, // Validates "MM/DD/YYYY" format
        message: 'must be in MM/DD/YYYY format',
      },
    },
    dateUpdated: {
      presence: true,
      format: {
        pattern: /^\d{2}\/\d{2}\/\d{4}$/, // Validates "MM/DD/YYYY" format
        message: 'must be in MM/DD/YYYY format',
      },
    },
    cartId: {
      presence: true,
      type: 'string', // Ensures it's a string
      format: {
        pattern: /^[0-9a-fA-F]{24}$/, // MongoDB ObjectID pattern
        message: 'must be a valid MongoDB ObjectID',
      },
    },
  };

  // Validate request body
  const validationErrors = validate(req.body, constraints);

  if (validationErrors) {
    // Respond with validation errors
    return res.status(400).json({
      message: 'Validation failed',
      errors: validationErrors,
    });
  }

  next();
};

module.exports = validateUserInput;
