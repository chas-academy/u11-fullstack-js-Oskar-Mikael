import express from 'express';
import { getPosts, createPost, getPost, updatePost, deletePost, addComment, deleteComment, likePost, unlikePost, getPostsByCategory, searchPosts, getUsersPosts, editComment } from '../../controllers/posts.js';
import requireAuth from '../../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getPosts);
router.get('/user/:id', getUsersPosts);
router.get('/category', getPostsByCategory);
router.get('/search', searchPosts);
router.get('/:id', getPost);
router.post('/', requireAuth, createPost);
router.post('/comment', requireAuth, addComment);
router.patch('/edit-comment/:id', requireAuth, editComment);
router.patch('/:id', requireAuth, updatePost);
router.patch('/like/:id', requireAuth, likePost);
router.patch('/unlike/:id', requireAuth, unlikePost);
router.patch('/comment/:id', requireAuth, deleteComment);
router.delete('/:id', requireAuth, deletePost);

export default router;
