import mongoose from 'mongoose';
import Comment from './comment.js';

const postSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title field is required']
  },
  message: {
    type: String,
    required: [true, 'Message field is required']
  },
  creator: String,
  likeCount: {
    type: Number,
    default: 0,
  },

}, {timestamps: true});

const Post = mongoose.model('Post', postSchema);

export default Post;