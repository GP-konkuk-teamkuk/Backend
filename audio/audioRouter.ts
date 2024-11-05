import express from 'express';
import multer from 'multer';
import path from 'path';
import uuid4 from 'uuid4';
import { uploadAudio, downloadAudio } from './audioService';

const router = express.Router();

// multer
const upload = multer({
  storage: multer.diskStorage({
    filename(req, file, done) {
      const randomId = uuid4();
      const ext = path.extname(file.originalname);
      const filename = randomId + ext;
      console.log(filename);
      done(null, filename);
    },
    destination(req, file, done) {
      done(null, path.join(__dirname, 'files'));
    },
  }),
});

const uploadMiddleware = upload.single('file');

// Audio upload route
router.post('/audio', uploadMiddleware, uploadAudio);

// Audio download route
router.get('/audio', downloadAudio);

export default router;
