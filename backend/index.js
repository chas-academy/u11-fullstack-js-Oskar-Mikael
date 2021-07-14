import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import posts from './routes/api/posts.js';

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/posts', posts);

app.get('/', (req, res) => res.send('Welcome to U11 Backend'));

const PORT = process.env.PORT || 5000;

mongoose.connect("mongodb+srv://root:root@cluster0.eqraj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", { useNewUrlParse: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`)))
    .catch((error) => console.log(error.message));

mongoose.set('useFindAndModify', false);