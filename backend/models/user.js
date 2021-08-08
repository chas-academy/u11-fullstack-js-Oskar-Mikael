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
    hash: String,
    salt: String,
    isAdmin: Number,
  },
  { timestamps: true }
);

// userSchema.plugin(uniqueValidator, {message: 'is already taken'});

// userSchema.methods.setPassword = (password) => {
//     this.salt = crypto.randomBytes(16).toString('hex');
//     this.hash = crypto.pbkdf2(password, this.salt, 10000, 512, 'sha512').toString('hex');
// }

// userSchema.methods.validPassword = (password) => {
//     const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
//     return this.hash === hash;
// }

const User = mongoose.model('User', userSchema);

export default User;
