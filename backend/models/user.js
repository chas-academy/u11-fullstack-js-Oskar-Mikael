import mongoose from 'mongoose';

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'Username field cannot be blank'],
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email field cannot be blank'],
      unique: true,
    },
    bio: String,
    password: {
      type: String,
      required: [true, 'Password field cannot be blank'],
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
