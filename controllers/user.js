import User from "../models/user.js"
import { theError } from "../middleware/error.js";


/////////// CREATE A USER /////////
const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json(user)
    } catch (err) {
        next(err);
    }
}


/////////// DELETE A USER /////////
const deleteUser = async (req, res, next) => {
    if (req.params.id === req.user.id) {
        try {
            await User.findByIdAndDelete(req.params.id);
            res.status(200).json("User has been deleted.");
        } catch (err) {
            next(err);
        }
    } else {
        return next(theError(403, "You can delete only your account!"));
    }
}


//////// UPDATE A USER ///////
const updateUser = async (req, res, next) => {
    try {
        res.json("update user")
    } catch (err) {
        next(err);
    }
}


////////// LIKE //////////////
const like = async (req, res, next) => {
    try {
        res.json("like")
    } catch (err) {
        next(err);
    }
}


/////////// DISLIKE /////////
const dislike = async (req, res, next) => {
    try {
        res.json("dislike")
    } catch (err) {
        next(err);
    }
}



////////// SUBSCRIBE //////////////
const subscribe = async (req, res, next) => {
    try {
        res.json("sub")
    } catch (err) {
        next(err);
    }
}



/////////// UNSUBSCRIBE /////////
const unsubscribe = async (req, res, next) => {
    try {
        res.json("unsub")
    } catch (err) {
        next(err);
    }
}

export { getUser, deleteUser, updateUser, like, dislike, subscribe, unsubscribe }