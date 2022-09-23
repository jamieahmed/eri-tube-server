import mongoose from "mongoose";


const commentSchema = new mongoose.Schema({


})

const Comment = mongoose.model('Comment', commentSchema)

export {
    Comment
}