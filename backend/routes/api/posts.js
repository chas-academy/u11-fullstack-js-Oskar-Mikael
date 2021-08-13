import express from 'express';
import { getPosts, createPost } from '../../controllers/posts.js';
import requireAuth from '../../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', requireAuth, getPosts);
router.post('/', createPost);

export default router;
