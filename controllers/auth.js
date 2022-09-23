import mongoose from 'mongoose'
import User from '../models/user.js'
import { theError } from '../middleware/error.js';
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";
const SALT_ROUNDS = 10


const signup = async (req, res, next) => {
    try {
        const salt = bcrypt.genSaltSync(SALT_ROUNDS);
        const hash = bcrypt.hashSync(req.body.password, salt);
        const newUser = new User({ ...req.body, password: hash });
        await newUser.save();
        res.status(200).send("User has been created Successfully!");

    } catch (error) {
        next(err);
    }
}

const signin = async (req, res, next) => {

    try {
        const user = await User.findOne({ name: req.body.name });
        if (!user) return next(theError(404, "User not found!"));

        const isCorrect = await bcrypt.compare(req.body.password, user.password);

        if (!isCorrect) return next(theError(400, "Wrong Credentials!"));

        const token = jwt.sign({ id: user._id }, process.env.SECRET);
        const { password, ...others } = user._doc;

        res
            .cookie("access_token", token, {
                httpOnly: true,
            })
            .status(200)
            .json(others);

    } catch (error) {
        next(err);
    }
}

const googleAuth = async (req, res, next) => {
    try {

    } catch (error) {

    }
}




export { signup, signin, googleAuth }