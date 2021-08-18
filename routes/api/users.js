import express from 'express';
import { register, login, logout, getUsers, getUser, changePassword } from '../../controllers/users.js';
import requireAuth from '../../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.get('/allusers', requireAuth, getUsers);
router.get('/:id', getUser)
router.patch('/change-password', changePassword);

export default router;
