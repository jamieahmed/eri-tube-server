import { Comment } from "../models/comment.js"
import { Video } from "../models/video.js";
import { theError } from "../middleware/error.js"

const getComments = async (req, res, next) => {
    try {
        const comments = await Comment.find({ videoId: req.params.videoId });
        res.status(200).json(comments);
    } catch (err) {
        next(err);
    }
}

const addComment = async (req, res, next) => {
    const newComment = new Comment({ ...req.body, userId: req.user.id });
    try {
        const savedComment = await newComment.save();
        res.status(200).send(savedComment);
    } catch (err) {
        next(err);
    }
}

const updateComment = async (req, res, next) => {
    try {
        res.json('here is updated comment')
    } catch (error) {
        next(error)
    }
}

const deleteComment = async (req, res, next) => {
    try {
        res.json("your comment successfully deleted")
    } catch (err) {
        next(err);
    }
}

export {
    getComments,
    addComment,
    updateComment,
    deleteComment
}