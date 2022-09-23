import User from "../models/user.js"
import { theError } from "../middleware/error.js";

////////////////////// Get a user ///////////////////////////////
const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json(user)
    } catch (err) {
        next(err);
    }
}

////////////////////// Delete a user ///////////////////////////////
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

export { getUser, deleteUser }