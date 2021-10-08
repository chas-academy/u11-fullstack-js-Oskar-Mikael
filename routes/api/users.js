import express from 'express';
import { register, login, logout, getUsers, getUser, changePassword, setPrivateTrue, setPrivateFalse, deleteUser, updateUser, adminUpdateUser } from '../../controllers/users.js';
import requireAuth from '../../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.get('/allusers', requireAuth, getUsers);
router.get('/:id', getUser)
router.patch('/change-password', requireAuth, changePassword);
router.patch('/private-true/:id', requireAuth, setPrivateTrue);
router.patch('/private-false/:id', requireAuth, setPrivateFalse);
router.patch('/edit-user/:id', requireAuth, updateUser);
router.patch('/admin-edit-user/:id', requireAuth, adminUpdateUser);
router.delete('/delete-user/:id', requireAuth, deleteUser);

export default router;
