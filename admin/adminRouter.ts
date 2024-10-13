import express from 'express';

const router = express.Router();

router.get('/manage/audio/list', (res, req) => {
  console.log('book_list');
  req.end();
});

router.get('/manage/book/items', (res, req) => {
  console.log('book_items');
  req.end();
});

router.get('/manage/user/select', (res, req) => {
  console.log('');
  req.end();
});

export default router;
