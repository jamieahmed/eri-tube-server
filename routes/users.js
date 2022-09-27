import { Router } from 'express'
import * as authCtrl from '../controllers/user.js'
import { checkAuth } from '../middleware/auth.js';
const router = Router()

/*---------- Public Routes ----------*/

router.get('/find/:id', authCtrl.getUser) //////////// GET A USER /////////

/*---------- Protected Routes ----------*/
router.delete('/:id', checkAuth, authCtrl.deleteUser)    //////////// DELETE A USER //////////////////
router.put('/:id', checkAuth, authCtrl.updateUser)         /////////// UPDATE A USER ////////////////
router.put('/like/:id', checkAuth, authCtrl.like)            /////////// LIKE  ////////////////////
router.put('/dislike/:id', checkAuth, authCtrl.dislike)        //////////// DISLIKE/////////////
router.put('/sub/:id', checkAuth, authCtrl.subscribe)     //////////// SUBSCRIBE////////
router.put('/unsub/:id', checkAuth, authCtrl.unsubscribe)   /////////// UNSUBSCRIBE ///

export { router }