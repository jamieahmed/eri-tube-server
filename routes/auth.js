import { Router } from 'express'
import { googleAuth, signin, signup } from '../controllers/auth.js';

const router = Router()

/*---------- Public Routes ----------*/
router.post('/signup', signup)   //////// ////// CREATE A USER /////////

router.post('/signin', signin)///////////////  SIGN IN /////////////////

router.post('/google', googleAuth)///////////////  GOOGLE AUTH /////////

/*---------- Protected Routes ----------*/


export { router }