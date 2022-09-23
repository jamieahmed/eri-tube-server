import jwt from 'jsonwebtoken'
import { theError } from './error'
const SECRET = process.env.SECRET


export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token) return next(theError(401, "You are not authenticated!"));

    jwt.verify(token, SECRET, (err, user) => {
        if (err) return next(theError(403, "Token is not valid!"));
        req.user = user;
        next()
    });
};