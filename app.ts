import path from 'path';
import fs from 'fs/promises';

import express from 'express';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';

import sqlite from 'better-sqlite3';
import session from 'express-session';
import betterSqlite3SessionStore from 'better-sqlite3-session-store';

import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

import audioRouter from './audio/audioRouter';
import bookRouter from './book/bookRouter';
import userRouter from './user/userRouter';
import adminRouter from './admin/adminRouter';

dotenv.config();

const app = express();

const SqliteStore = betterSqlite3SessionStore(session);
const db = new sqlite('sessions.db', { verbose: console.log });

app.use(
  session({
    store: new SqliteStore({
      client: db,
      expired: {
        clear: true,
        intervalMs: 900000, //ms = 15min
      },
    }),
    secret: process.env.SECRET,
    resave: false,
  }),
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api', audioRouter);
app.use('/api', bookRouter);
app.use('/api', userRouter);
app.use('/api', adminRouter);

const swaggerFile = require('./swagger_output.json');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(express.static(path.join(__dirname, 'public')));

// React 라우팅
app.get('*', (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, 'public', 'index.html'));
  res.end();
});

app.listen(8080, () => {
  console.log('Server started on http://localhost:8080');
});
