import mongoose from 'mongoose';
// import crypto from 'crypto';
// import uniqueValidator from 'mongoose-unique-validator';

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'field cannot be blank'],
      unique: true,
    },
    email: {
      type: String,
      required: [true, 'field cannot be blank'],
      unique: true,
    },
    bio: String,
    password: {
      type: String,
      required: [true, 'field cannot be blank'],
    },
    isAdmin: Number,
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);

export default User;
