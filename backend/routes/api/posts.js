import express from 'express';
import { getPosts, createPost, getPost } from '../../controllers/posts.js';
import requireAuth from '../../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getPosts);
router.get('/:id', getPost);
router.post('/', requireAuth, createPost);

export default router;
