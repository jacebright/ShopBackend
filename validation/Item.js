//jaden binette

const validate = require('validate.js');

const validateProductInput = (req, res, next) => {
  // Define validation constraints
  const constraints = {
    productId: {
      presence: true,
      numericality: {
        onlyInteger: true, // Ensures it's an integer
        greaterThan: 0, // Must be positive
      },
    },
    productPrice: {
      presence: true,
      numericality: {
        greaterThan: 0, // Must be positive
      },
    },
    productName: {
      presence: true,
      type: 'string', // Ensures it's a string
      length: { minimum: 1 }, // At least one character
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

module.exports = validateProductInput;
