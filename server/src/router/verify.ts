import { Router } from 'express'
import { verifyCodeController, verifyController } from '@import/controllers'

const router = Router()

router.post('/', verifyController)
router.post('/code', verifyCodeController)

export default router
