import { Router } from 'express'
import { blockController } from '@import/controllers'

const router = Router()

router.get('/', blockController.getBlocks)
router.get('/:id', blockController.getBlock)
router.post('/', blockController.createBlock)
router.put('/:id', blockController.updateBlock)
router.delete('/:id', blockController.deleteBlock)

export default router
