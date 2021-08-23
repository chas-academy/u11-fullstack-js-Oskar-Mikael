import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import posts from './routes/api/posts.js';
import users from './routes/api/users.js';
import dotenv from 'dotenv';

const app = express();

app.use(express.json());
app.use(cors());
dotenv.config()

app.use('/api/posts', posts);

app.get('/', (req, res) => res.send('Welcome to U11 Backend'));

app.use('/api/users', users);

const PORT = process.env.PORT;

mongoose
  .connect(
    process.env.MONGO_URI,
    { useNewUrlParse: true, useUnifiedTopology: true }
  )
  .then(() =>
    app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`))
  )
  .catch((error) => console.log(error.message));

mongoose.set('useFindAndModify', false);
