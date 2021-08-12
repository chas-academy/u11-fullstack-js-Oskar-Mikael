import User from '../models/user.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = 'mv239@0mv8!230*9!90rttbn23w2g534'

export const register = async (req, res) => {

  const {
    username,
    email,
    password: plainTextPassword,
    bio
  } = req.body;

  if (plainTextPassword.length < 8) {
    return res.status(400).json({ error: { type: 'password', message: 'Password need atleast 8 characters' } });
  }

  if (!username) {
    return res.status(400).json({ error: { type: 'username', message: 'Username is required' } });
  }

  if (!email) {
    return res.status(400).json({ error: { type: 'email', message: 'Email is required' } });
  }

  const password = await bcrypt.hash(plainTextPassword, 10);

  try {
    const response = await User.create({
      username,
      email,
      password,
      bio
    });
    return res.status(201).json(response);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(403).json({ message: `${error.keyValue[Object.keys(error.keyValue)[0]]} is already in use` })
    }
    return res.status(409).json({ message: error });
  }
};

export const login = async (req, res) => {

  const { email, password } = req.body

  const user = await User.findOne({ email }).lean();

  if (!user) {
    return res.status(404).json({ message: 'Invalid login credentials' });
  }

  if (await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({
      id: user._id,
      email: user.email
    }, JWT_SECRET)

    return res.status(200).json({ message: user, token });
  }
  return res.status(404).json({ message: 'Invalid password credentials' });
};

export const logout = async (req, res) => {
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    console.log(users);
    res.status(200).json(users);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const changePassword = async (req, res) => {
  const { token, newPassword: plainTextPassword } = req.body;

  if (plainTextPassword.length < 8) {
    return res.status(400).json({ message: 'Password need atleast 8 characters' })
  }

  try {
    const user = jwt.verify(token, JWT_SECRET)

    const _id = user.id;

    const password = await bcrypt.hash(plainTextPassword, 10)

    await User.updateOne(
      { _id },
      {
        $set: { password }
      })
    res.status(200).json({ message: 'Password updated' })
  } catch(error) {
    console.log(error)
    res.status(400).json({ message: 'There was an error' })
  }
}
