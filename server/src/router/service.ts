import { Router } from 'express'
import { serviceController } from '@import/controllers'

const router = Router()

router.get('/', serviceController.getServices)
router.get('/:id', serviceController.getService)
router.post('/', serviceController.createService)
router.put('/:id', serviceController.updateService)
router.delete('/:id', serviceController.deleteService)

export default router
