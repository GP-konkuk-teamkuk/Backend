import express from 'express';

const router = express.Router();

router.get('/book/list', (res, req) => {
  console.log('book_list');
  req.end();
});

router.get('/book/items', (res, req) => {
  console.log('book_items');
  req.end();
});

router.get('/book/select', (res, req) => {
  console.log('');
  req.end();
});

router.get('/book/detail', (res, req) => {
  console.log('/api/book/detail');
  req.end();
});

export default router;
