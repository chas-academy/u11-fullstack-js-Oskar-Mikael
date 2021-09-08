import Post from '../models/post.js';
import User from '../models/user.js';
import Comment from '../models/comment.js';
import jwt from 'jsonwebtoken';

export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getUsersPosts = async (req, res) => {
  const { id } = req.params;

  try {
    const posts = await Post.find({ 'creator.message._id': id })
    res.status(200).json({ message: posts })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
};

export const getPostsByCategory = async (req, res) => {
  const { category } = req.query;

  try {
    const posts = await Post.find({ category });
    if (posts.length === 0) {
      res.status(404).json({ message: 'No posts found' });
    }
    res.status(200).json({ posts });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const searchPosts = async (req, res) => {
  const { category, title } = req.query;

  try {
    const posts = await Post.find({
      category: { $regex: category, $exists: true, $ne: null },
      title: { $regex: title, $options: 'i', $exists: true, $ne: null },
    });
    if (posts.length === 0) {
      res.status(404).json({ message: 'No posts found' });
    }
    res.status(200).json({ posts });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const createPost = async (req, res) => {
  const post = req.body;

  const newPost = new Post(post);

  try {
    await newPost.save();
    res.status(201).json({ message: newPost });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json({ message: post });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updatePost = async (req, res) => {
  const token = req.headers.authorization;

  const user = jwt.verify(token, process.env.JWT_SECRET);

  const userId = user.id;

  const userProfile = await User.findById(userId);

  const post = await Post.findById(req.params.id);

  const _id = post._id;

  const { title, body } = req.body;

  if (post.creator.message._id === userId || userProfile.isAdmin) {
    try {
      await Post.updateOne(
        { _id },
        {
          $set: {
            body,
            title,
          },
        }
      );
      res.status(200).json({ message: userProfile });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  } else {
    res.status(403).json({ message: 'You are not authorized' });
  }
};

export const deletePost = async (req, res) => {
  const token = req.headers.authorization;

  const user = jwt.verify(token, process.env.JWT_SECRET);

  const _id = user.id;

  const userProfile = await User.findById(user.id);

  const post = await Post.findById(req.params.id);

  const postId = post._id;

  if (post.creator.message._id === _id || userProfile.isAdmin) {
    try {
      await post.deleteOne({ postId });
      res.status(200).json({ message: 'Post deleted' });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  } else {
    res.status(403).json({ message: 'You are not authorized' });
  }
};

export const addComment = async (req, res) => {
  const { id, message } = req.body;

  const token = req.headers.authorization;

  const user = jwt.verify(token, process.env.JWT_SECRET);

  const userProfile = await User.findById(user.id);

  const post = await Post.findById(id);

  const _id = post._id;

  if (!message) {
    return res.status(400).json({ error: 'Message field is required' });
  }

  try {
    await Post.updateOne(
      { _id },
      {
        $push: {
          comments: await new Comment({
            message,
            creator: userProfile,
          }),
        },
      }
    );
    res.status(201).json({ message: 'Test' });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

export const deleteComment = async (req, res) => {
  const commentId = req.body.id;

  const token = req.headers.authorization;

  const user = jwt.verify(token, process.env.JWT_SECRET);

  const userProfile = await User.findById(user.id);

  const post = await Post.findById(req.params.id);

  const _id = post.id;

  const postComments = post.comments.map((comment) => comment._id);

  const commentIndex = postComments.indexOf(commentId);

  if (
    post.comments[commentIndex].creator._id == user.id ||
    userProfile.isAdmin
  ) {
    try {
      await Post.updateOne(
        { _id },
        {
          $pull: {
            comments: post.comments[commentIndex],
          },
        },
        { new: true }
      );
      res.status(200).json({ message: post });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  } else {
    res.status(403).json({ error: 'You are not authorized' });
  }
};

export const editComment = async (req, res) => {
  const { id } = req.body;

  const token = req.headers.authorization;

  const user = jwt.verify(token, process.env.JWT_SECRET);

  const userProfile = await User.findById(user.id);

  const post = await Post.findById(req.params.id);

  const _id = post.id;

  const postComments = post.comments.map((comment) => comment._id);

  const commentIndex = postComments.indexOf(id.id);

  if (
    post.comments[commentIndex].creator._id == user.id ||
    userProfile.isAdmin
  ) {
    try {
      await Post.findOneAndUpdate(
        { _id: _id },
        {
          $set: {
            "comments.$[elem].message": id.comment
          }
        },
        {
          arrayFilters: [
            {
              "elem._id": id.id
            }
          ]
        }
      );
      res.status(200).json({ message: post });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  } else {
    res.status(403).json({ error: 'You are not authorized' });
  }
}

export const likePost = async (req, res) => {
  const { id } = req.params;

  const token = req.headers.authorization;

  const user = jwt.verify(token, process.env.JWT_SECRET);

  const userId = user.id;

  const post = await Post.findById(id);

  const _id = post.id;

  try {
    await Post.updateOne(
      { _id },
      {
        $set: {
          likeCount: post.likeCount + 1,
        },
      }
    );

    await User.updateOne(
      { _id: userId },
      {
        $push: {
          likedPosts: _id,
        },
      },
      { new: true }
    );

    res.status(200).json({ message: post });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const unlikePost = async (req, res) => {
  const { id } = req.params;

  const token = req.headers.authorization;

  const user = jwt.verify(token, process.env.JWT_SECRET);

  const userId = user.id;

  const post = await Post.findById(id);

  const _id = post.id;

  try {
    await Post.updateOne(
      { _id },
      {
        $set: {
          likeCount: post.likeCount - 1,
        },
      }
    );

    await User.updateOne(
      { _id: userId },
      {
        $pull: {
          likedPosts: post.id,
        },
      },
      { new: true }
    );

    res.status(200).json({ message: post });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
