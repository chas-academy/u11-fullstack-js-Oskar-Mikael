import mongoose from 'mongoose';
import Comment from './comment.js';

const postSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title field is required']
  },
  body: {
    type: String,
    required: [true, 'Body field is required']
  },
  creator: {},
  likeCount: {
    type: Number,
    default: 0,
  },
  comments: [],
}, {timestamps: true});

const Post = mongoose.model('Post', postSchema);

export default Post;