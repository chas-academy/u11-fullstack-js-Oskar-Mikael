import Post from "../models/post.js";
import jwt from 'jsonwebtoken';

export const getPosts = async (req, res) => {
    try {
        const posts = await Post.find();
        res.status(200).json(posts);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createPost = async (req, res) => {
    const post = req.body;

    const newPost = new Post(post);

    try {
        await newPost.save()
        res.status(201).json(newPost);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const getPost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        res.status(200).json({ message: post })
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const updatePost = async (req, res) => {
    const token = req.headers.authorization

    const user = jwt.verify(token, 'mv239@0mv8!230*9!90rttbn23w2g534')

    const userId = user.id;

    const post = await Post.findById(req.params.id)

    const _id = post._id

    const { title, body } = req.body

    if (post.creator.message._id === userId) {
        try {
            await Post.updateOne(
                { _id },
                {
                    $set:
                    {
                        body,
                        title
                    }
                })
            res.status(200).json({ message: body })
        } catch (error) {
            res.status(400).json({ message: error.message })
        }
    } else {
        res.status(403).json({ message: 'You are not authorized' })
    }
}

export const deletePost = async (req, res) => {
    const token = req.headers.authorization

    const user = jwt.verify(token, 'mv239@0mv8!230*9!90rttbn23w2g534')

    const _id = user.id;

    const post = await Post.findById(req.params.id)

    const postId = post._id

    if (post.creator.message._id === _id) {
        try {
            await post.deleteOne({ postId })
            res.status(200).json({ message: 'Post deleted' })
        } catch (error) {
            res.status(400).json({ message: error.message })
        }
    } else {
        res.status(403).json({ message: 'You are not authorized' })
    }
}
