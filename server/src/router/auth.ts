import { Router } from 'express'
import { authController } from '@import/controllers'

const router = Router()

router.post('/', authController)

export default router
