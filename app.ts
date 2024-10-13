import express from 'express';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';

import audioRouter from './audio/audioRouter';
import bookRouter from './book/bookRouter';
import userRouter from './user/userRouter';
import adminRouter from './admin/adminRouter';

dotenv.config();

//TODO : SSL 붙이기
const app = express();

app.use(express.json());
app.use(express.static('./public'));

app.use('/api', audioRouter);
app.use('/api', bookRouter);
app.use('/api', userRouter);
app.use('/api', adminRouter);

const swaggerFile = require('./swagger_output.json');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.listen(3000, () => {
  console.log('Server started on http://localhost:3000');
});
