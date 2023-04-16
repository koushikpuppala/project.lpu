import { Router } from 'express'
import { verifyController } from '@import/controllers'

const router = Router()

router.post('/', verifyController)

export default router
