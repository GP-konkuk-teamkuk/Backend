import express from 'express';
import { fetchAudioList, fetchBookItems, fetchUserSelection } from './adminService';

const router = express.Router();

router.get('/manage/audio/list', async (req, res) => {
  try {
    const audioList = await fetchAudioList();
    res.json(audioList);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get('/manage/book/items', async (req, res) => {
  try {
    const bookItems = await fetchBookItems();
    res.json(bookItems);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get('/manage/user/select', async (req, res) => {
  try {
    const userSelection = await fetchUserSelection();
    res.json(userSelection);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

export default router;
