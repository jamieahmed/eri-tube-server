import { Router } from 'express'
import { getUser } from '../controllers/user.js';

const router = Router()

/*---------- Public Routes ----------*/
router.get('/find/:id', getUser) //////////// GET A USER /////////

/*---------- Protected Routes ----------*/


export { router }