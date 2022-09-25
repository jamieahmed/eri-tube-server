import { Router } from 'express'
import * as videoCtrl from '../controllers/video.js'
import { checkAuth } from '../middleware/auth.js';

const router = Router()

/*---------- Public Routes ----------*/
router.get('/find/:id', videoCtrl.getVideo) //////////// GET A VIDEO /////////
router.get('/trend/:id', videoCtrl.trend)   //////////// GET A VIDEO /////////
router.get('/random', videoCtrl.random)     //////////// GET A RANDOM VIDEO //
router.get('/tags', videoCtrl.getByTag)     //////////// GET BY TAG /////////
router.get('/search', videoCtrl.search)     //////////// SEARCH VIDEOS //////
router.put('/view/:id', videoCtrl.addView)  //////////// ADD VIEWS /////////

/*---------- Protected Routes ----------*/
router.post('/', checkAuth, videoCtrl.addVideo)           //////////// ADD A VIDEO //////////////////
router.put('/:id', checkAuth, videoCtrl.updateVideo)      /////////// UPDATE A VIDEO ////////////////
router.delete('/:id', checkAuth, videoCtrl.deleteVideo)   /////////// DELETE A VIDEO  ////////////////////
router.put('/sub', checkAuth, videoCtrl.sub)              //////////// SUB /////////////

export { router }