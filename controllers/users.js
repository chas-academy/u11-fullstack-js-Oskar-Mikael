import User from '../models/user.js';
import Post from '../models/post.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {

  const {
    username,
    email,
    password: plainTextPassword,
    bio,
    country
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

  if (!country) {
    return res.status(400).json({ error: { type: 'country', message: 'Country is required' } });
  }

  const password = await bcrypt.hash(plainTextPassword, 10);

  try {
    const response = await User.create({
      username,
      email,
      password,
      bio,
      country
    });
    return res.status(201).json(response);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(401).json({ message: `${error.keyValue[Object.keys(error.keyValue)[0]]} is already in use` })
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
    }, process.env.JWT_SECRET)
    return res.status(200).json({ message: user, token, });
  }
  return res.status(404).json({ message: 'Invalid login credentials' });
};

export const logout = async (req, res) => {
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ message: users });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    res.status(200).json({ message: user })
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

export const changePassword = async (req, res) => {
  const { newPassword: plainTextPassword } = req.body;
  const token = req.headers.authorization

  if (plainTextPassword.length < 8) {
    return res.status(400).json({ message: 'Password need atleast 8 characters' })
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET)

    const _id = user.id;

    const password = await bcrypt.hash(plainTextPassword, 10)

    await User.updateOne(
      { _id },
      {
        $set: { password }
      })
    res.status(200).json({ message: 'Password updated' })
  } catch (error) {
    console.log(error)
    res.status(400).json({ message: 'There was an error' })
  }
}

export const setPrivateTrue = async (req, res) => {
  const user = await User.findById(req.params.id)

  const _id = user.id

  try {
    await User.updateOne(
      { _id },
      {
        $set: { isPrivate: 1 }
      })
    res.status(200).json({ message: 'Profile updated' })
  } catch (error) {
    console.log(error)
    res.status(400).json({ message: 'There was an error' })
  }
}

export const setPrivateFalse = async (req, res) => {
  const user = await User.findById(req.params.id)

  const _id = user.id

  try {
    await User.updateOne(
      { _id },
      {
        $set: { isPrivate: 0 }
      })
    res.status(200).json({ message: 'Profile updated' })
  } catch (error) {
    console.log(error)
    res.status(400).json({ message: 'There was an error' })
  }
}

export const adminUpdateUser = async (req, res) => {
  const { username, email, bio, country, isAdmin } = req.body

  const token = req.headers.authorization;

  const currentUser = jwt.verify(token, process.env.JWT_SECRET);

  const currentUserProfile = await User.findById(currentUser.id);

  const user = await User.findById(req.params.id);

  const _id = user._id

  if (currentUserProfile.isAdmin) {
    try {
      await User.updateOne(
        { _id },
        {
          $set:
          {
            username,
            email,
            bio,
            country,
            isAdmin
          }
        }
      )
      res.status(200).json({ message: user })
    } catch (error) {
      res.status(401).json({ error: error })
    }
  } else {
    res.status(401).json({ message: _id });
  }
}

export const updateUser = async (req, res) => {
  const { bio, country } = req.body

  const token = req.headers.authorization;

  const currentUser = jwt.verify(token, process.env.JWT_SECRET);

  const user = await User.findById(req.params.id);

  const _id = user._id

  if (currentUser.id != _id) {
    res.status(401).json({ message: 'You are not authorized' });
  } else {
    try {
      await User.updateOne(
        { _id },
        {
          $set:
          {
            bio,
            country
          }
        }
      )
      res.status(200).json({ message: user })
    } catch (error) {
      res.status(401).json({ error: error })
    }
  }
}


export const deleteUser = async (req, res) => {
  const user = await User.findById(req.params.id)

  const userId = user._id

  const token = req.headers.authorization;

  const currentUser = jwt.verify(token, process.env.JWT_SECRET)

  const currentUserId = currentUser.id;

  const currentUserProfile = await User.findById(currentUserId)

  const userPosts = await Post.find({ "creator.message._id": userId.toString() })

  const userPostsIds = userPosts.map(post => post._id)

  if (!currentUserProfile.isAdmin) {
    return res.status(401).json({ message: 'You are not authorized' })
  }
  try {
    await user.deleteOne({ userId })
    await Post.deleteMany({ _id: userPostsIds })
    res.status(200).json({ userPosts })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}
