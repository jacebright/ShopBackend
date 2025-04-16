const validate = require('validate.js');

const validateCartInput = (req, res, next) => {
  // Define validation constraints
  const constraints = {
    products: {
      presence: true,
      type: 'array', // Ensures it's an array
      length: { minimum: 0 },
      // array: {
        // productId: {
        //   presence: true,
        //   type: 'string', // Ensures each productId is a string
        //   format: {
        //     pattern: /^[0-9a-fA-F]{24}$/, // MongoDB ObjectID pattern
        //     message: 'must be a valid MongoDB ObjectID',
        //   },
        // },
      // },
    },
    userId: {
      type: 'string', // Optional field, ensure it's a string if provided
      format: {
        pattern: /^[0-9a-fA-F]{24}$/, // MongoDB ObjectID pattern
        message: 'must be a valid MongoDB ObjectID',
      },
    },
    cartTotal: {
      numericality: {
        greaterThanOrEqualTo: 0, // Must be 0 or greater if provided
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
