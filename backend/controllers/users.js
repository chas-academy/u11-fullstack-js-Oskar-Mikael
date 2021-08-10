import User from '../models/user.js';
import bcrypt from 'bcryptjs';

export const register = async (req, res) => {

  const {
    username,
    email,
    password: plainTextPassword
  } = req.body;

  if (!username || typeof username !== 'string') {
    return res.status(403).json({ message: 'Invalid Username' })
  }

  if (!plainTextPassword || typeof plainTextPassword !== 'string') {
    return res.status(403).json({ message: 'Invalid Password' })
  }

  if (plainTextPassword.length < 8) {
    return res.status(403).json({ message: 'Password need atleast 8 characters' })
  }

  const password = await bcrypt.hash(plainTextPassword, 10);

  try {
    const response = await User.create({
      username,
      email,
      password
    });
    return res.status(201).json(response);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(403).json({ message: `${error.keyValue[Object.keys(error.keyValue)[0]]} is already in use` })
    }
    return res.status(409).json({ message: error });
  }
};

export const login = async (req, res) => { };

export const logout = async (req, res) => { };

export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    console.log(users);
    res.status(200).json(users);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
