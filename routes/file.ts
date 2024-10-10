import * as express from 'express';

const router = express.Router();

router.get('/api/book/list', (res, req) => {
	  console.log("book_list")
})

router.get('/api/book/items', (res, req) => {
	console.log("book_items")
})

