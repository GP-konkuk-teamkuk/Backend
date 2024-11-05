import express from 'express';
import { getBookList, getBookItems, selectBook, getBookDetail } from './bookService';

const router = express.Router();

/**
 * 책 리스트
 */
router.get('/book/list', getBookList);

/**
 * 책 선택시
 */
router.get('/book/items', getBookItems);

/**
 * 책을 선택한 다음 유저 정보를 통해 보여줄 때 필요함.
 */
router.get('/book/select', selectBook);

router.get('/book/detail', getBookDetail);

export default router;
