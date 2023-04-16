import { Router } from 'express'
import { bookingController } from '@import/controllers'

const router = Router()

router.get('/', bookingController.getBookings)
router.get('/:id', bookingController.getBooking)
router.post('/', bookingController.createBooking)
router.put('/:id', bookingController.updateBooking)
router.delete('/:id', bookingController.deleteBooking)

export default router
