//Jaden Binett

const validate = require('validate.js');

const validateCartInput = (req, res, next) => {
  // Define validation constraints
  const constraints = {
    cartId: {
      presence: true,
      type: 'string', // Ensures it's a string
      format: {
        pattern: /^[0-9a-fA-F]{24}$/, // MongoDB ObjectID pattern
        message: 'must be a valid MongoDB ObjectID',
      },
    },
    userId: {
      presence: true,
      type: 'string', // Ensures it's a string
      format: {
        pattern: /^[0-9a-fA-F]{24}$/, // MongoDB ObjectID pattern
        message: 'must be a valid MongoDB ObjectID',
      },
    },
    dateCreated: {
      presence: true,
      format: {
        pattern: /^\d{2}\/\d{2}\/\d{4}$/, // Validates "MM/DD/YYYY" format
        message: 'must be in MM/DD/YYYY format',
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

module.exports = validateCartInput;
