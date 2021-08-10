import mongoose from "mongoose";

const commentSchema = mongoose.Schema({
    message: {
        type: String,
        required: [true, 'Message field is required'],
    },
    creator: String
}, {timestamps: true});

const Comment = mongoose.model('Comment', commentSchema);

export default Comment