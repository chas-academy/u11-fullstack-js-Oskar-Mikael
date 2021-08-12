import mongoose from 'mongoose';

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
    },
    bio: String,
    password: {
      type: String,
    },
    isAdmin: {
      type: Number,
      default: 0
    },
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);

export default User;
