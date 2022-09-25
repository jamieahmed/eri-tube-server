import { Router } from 'express'
import * as authCtrl from '../controllers/comment.js'
import { checkAuth } from '../middleware/auth.js';

const router = Router()

/*---------- Public Routes ----------*/
router.get('/:videoId', authCtrl.getComments) //////////// GET A COMMENTS /////////

/*---------- Protected Routes ----------*/
router.post('/', checkAuth, authCtrl.addComment)          /////////// ADD A COMMENT ////////////////
router.put('/:id', checkAuth, authCtrl.updateComment)     /////////// UPDATE A COMMENT////////////////
router.delete('/:id', checkAuth, authCtrl.deleteComment)  //////////// DELETE A COMMENT //////////////////



export { router }