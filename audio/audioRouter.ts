import express from 'express';

const router = express.Router();

router.post('/audio/upload', (res, req) => {
  console.log('/audio/upload');
});

router.get('/audio/download', (res, req) => {
  console.log('/audio/download');
});

export default router;
