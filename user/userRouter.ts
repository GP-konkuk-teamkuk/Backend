import express from 'express';

const router = express.Router();

router.post('/user/login', (res, req) => {
  req.end();
});

router.post('/user/logout', (res, req) => {
  req.end();
});

router.post('/user/register', (res, req) => {
  req.end();
});


export default router;
