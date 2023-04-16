import { Router } from 'express'
import { paymentController } from '@import/controllers'

const router = Router()

router.get('/', paymentController.getPayments)
router.get('/:id', paymentController.getPayment)
router.post('/', paymentController.createPayment)
router.put('/:id', paymentController.updatePayment)
router.delete('/:id', paymentController.deletePayment)
router.post('/checkout', paymentController.createOrder)
router.post('/verify', paymentController.verifyPayment)
export default router
