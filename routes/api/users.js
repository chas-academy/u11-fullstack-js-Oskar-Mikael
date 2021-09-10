import express from 'express';
import { register, login, logout, getUsers, getUser, changePassword, setPrivateTrue, setPrivateFalse, deleteUser, updateUser } from '../../controllers/users.js';
import requireAuth from '../../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.get('/allusers', requireAuth, getUsers);
router.get('/:id', getUser)
router.patch('/change-password', changePassword);
router.patch('/private-true/:id', setPrivateTrue);
router.patch('/private-false/:id', setPrivateFalse);
router.patch('/edit-user/:id', requireAuth, updateUser);
router.delete('/delete-user/:id', requireAuth, deleteUser);

export default router;
