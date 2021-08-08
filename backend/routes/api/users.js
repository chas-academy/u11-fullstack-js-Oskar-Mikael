import express from 'express';
import { register, login, logout, getUsers } from '../../controllers/users.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.get('/allusers', getUsers);

export default router;
