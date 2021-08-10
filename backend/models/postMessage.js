import mongoose from 'mongoose';

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

const PostMessage = mongoose.model('PostMessage', postSchema);

export default PostMessage;