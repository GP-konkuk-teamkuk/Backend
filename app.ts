import path from 'path';
import fs from 'fs/promises';

import express from 'express';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';

import bodyParser from 'body-parser';

import audioRouter from './audio/audioRouter';
import bookRouter from './book/bookRouter';
import userRouter from './user/userRouter';
import adminRouter from './admin/adminRouter';

dotenv.config();

//TODO : SSL 붙이기
const app = express();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api', audioRouter);
app.use('/api', bookRouter);
app.use('/api', userRouter);
app.use('/api', adminRouter);

const swaggerFile = require('./swagger_output.json');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(express.static(path.join(__dirname, 'public')));

// React 라우팅
app.get('*', (req, res) => {
  console.log('hello');
  res.status(200).sendFile(path.resolve(__dirname, 'public', 'index.html'));
  res.end();
});

app.listen(8080, () => {
  console.log('Server started on http://localhost:8080');
});
