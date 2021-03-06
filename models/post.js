import mongoose from 'mongoose';
import Comment from './comment.js';

const postSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title field is required'],
    trim: true,
  },
  body: {
    type: String,
    required: [true, 'Body field is required'],
    trim: true,
  },
  creator: {},
  likeCount: {
    type: Number,
    default: 0,
  },
  comments: [],
  category: String,
}, {timestamps: true});

const Post = mongoose.model('Post', postSchema);

export default Post;