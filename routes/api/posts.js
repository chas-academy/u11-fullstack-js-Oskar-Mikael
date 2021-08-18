import express from 'express';
import { getPosts, createPost, getPost, updatePost, deletePost } from '../../controllers/posts.js';
import requireAuth from '../../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getPosts);
router.get('/:id', getPost);
router.post('/', requireAuth, createPost);
router.patch('/:id', requireAuth, updatePost);
router.delete('/:id', requireAuth, deletePost)

export default router;
