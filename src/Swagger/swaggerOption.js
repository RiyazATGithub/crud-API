const swaggerUi = require('swagger-ui-express')
const swaggerAutogen=require('swagger-autogen')()

const doc = {
  info: {
    title: 'My API',
    description: 'Description'
  },
  host: 'localhost:4000',
};

const outputFile = './swaggerDoc.json';
const routes=['./src/routes/routes.js']

swaggerAutogen(outputFile, routes, doc);
