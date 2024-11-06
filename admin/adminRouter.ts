import express from 'express';
import { fetchAudioList, fetchBookItems, fetchUserSelection, createBook, createUser } from './adminService';

const router = express.Router();

router.get('/manage/audio', async (req, res) => {
  try {
    const audioList = await fetchAudioList();
    res.json(audioList);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get('/manage/books', async (req, res) => {
  try {
    const bookItems = await fetchBookItems();
    res.json(bookItems);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get('/manage/users', async (req, res) => {
  try {
    const userSelection = await fetchUserSelection();
    res.json(userSelection);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.post('/manage/books', async (req, res) => {
  const { title, author, publishedDate, description } = req.body;
  try {
    const result = await createBook(title, author, publishedDate, description);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.post('/manage/users', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const result = await createUser(name, email, password);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

export default router;
