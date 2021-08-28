import express from 'express';
import { getPosts, createPost, getPost, updatePost, deletePost, addComment, deleteComment, likePost, unlikePost, getPostsByCategory, searchPosts, getUsersPosts } from '../../controllers/posts.js';
import requireAuth from '../../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getPosts);
router.get('/user/:id', getUsersPosts);
router.get('/category', getPostsByCategory);
router.get('/search', searchPosts);
router.get('/:id', getPost);
router.post('/', requireAuth, createPost);
router.post('/comment', requireAuth, addComment);
router.patch('/:id', requireAuth, updatePost);
router.patch('/like/:id', likePost);
router.patch('/unlike/:id', unlikePost);
router.patch('/comment/:id', deleteComment);
router.delete('/:id', requireAuth, deletePost);

export default router;
