import { Router } from 'express'
import { getUser, deleteUser } from '../controllers/user.js';
import { checkAuth } from '../middleware/auth.js';
const router = Router()

/*---------- Public Routes ----------*/
router.get('/find/:id', getUser) //////////// GET A USER /////////

/*---------- Protected Routes ----------*/
router.delete('/:id', checkAuth, deleteUser) //////////// DELETE A USER /////////

export { router }