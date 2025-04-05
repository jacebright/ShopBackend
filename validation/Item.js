//jaden binette

const validate = require("validate.js");

const validateProductInput = (req, res, next) => {
  // Define validation constraints for a single product
  const productConstraints = {
    productName: {
      presence: true,
      type: "string",
      length: { minimum: 1 }, // At least one character
    },
    productPrice: {
      presence: true,
      numericality: { greaterThan: 0 }, // Must be a positive number
    },
  };

  // Validate the product object in the request body
  const validationErrors = validate(req.body, productConstraints);

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

module.exports = validateProductInput;
