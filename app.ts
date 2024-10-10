import express from 'express';
import dotenv from 'dotenv';
import swaggerAutogen from 'swagger-autogen';
import swaggerUi from 'swagger-ui-express';

dotenv.config();

const app = express();

swaggerAutogen();

app.use(express.json());
app.use(express.static('./public'));

const swaggerFile = require('./swagger_output.json');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.listen(3000, () => {
  console.log('Server started on http://localhost:3000');
});
