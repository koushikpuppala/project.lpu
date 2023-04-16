import { Router } from 'express'
import authRouter from './auth'
import BlockRouter from './block'
import Booking from './booking'
import PaymentRouter from './payment'
import ServiceRouter from './service'
import UserRouter from './user'
import verifyRouter from './verify'

const router = Router()

router.use('/auth', authRouter)
router.use('/block', BlockRouter)
router.use('/booking', Booking)
router.use('/payment', PaymentRouter)
router.use('/service', ServiceRouter)
router.use('/user', UserRouter)
router.use('/verify', verifyRouter)

export default router
