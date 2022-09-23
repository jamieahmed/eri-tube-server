import jwt from 'jsonwebtoken'
const SECRET = process.env.SECRET
import { theError } from "./error.js";

const checkAuth = (req, res, next) => {
    let token = req.cookies.access_token;
    if (!token) return next(theError(401, "You are not authenticated!"));

    jwt.verify(token, SECRET, (err, user) => {
        if (err) return next(theError(403, "Token is not valid!"));
        req.user = user;
        next()
    });
};

export { checkAuth }