const SwaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.js');

module.exports = [SwaggerUi.serve, SwaggerUi.setup(swaggerDocument)];
