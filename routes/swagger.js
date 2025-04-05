const Router = require('express').Router;
const swaggerUi = require('swagger-ui-express');
const loadJson = require('../utils/load-json');

const swaggerDoc = loadJson('./swagger/swagger.json');

const router = Router();

router.use('/api-docs', swaggerUi.serve);
router.use('/api-docs', swaggerUi.setup(swaggerDoc));

module.exports = router;