import { Request, Response } from 'express'
import { Blocks } from '@import/database'

export const blockController = {
	getBlocks: async (req: Request, res: Response) => {
		try {
			const blocks = await Blocks.find()
			return res.status(200).send({ blocks })
		} catch (error) {
			console.error(error)
			return res.status(500).send({ error: error })
		}
	},

	getBlock: async (req: Request, res: Response) => {
		const { id } = req.params

		try {
			const blockExist = await Blocks.exists({ _id: id })

			!blockExist && res.status(404).send({ error: 'Block not found' })

			const block = await Blocks.findById(id)

			return res.status(200).send({ block })
		} catch (error) {
			console.error(error)
			return res.status(500).send({ error: error })
		}
	},

	createBlock: async (req: Request, res: Response) => {
		const { block } = req.body

		try {
			const newBlock = await Blocks.create(block)

			return res.status(200).send({ block: newBlock })
		} catch (error) {
			console.error(error)
			return res.status(500).send({ error: error })
		}
	},

	updateBlock: async (req: Request, res: Response) => {
		const { id } = req.params
		const { block } = req.body

		try {
			const blockExist = await Blocks.exists({ _id: id })

			!blockExist && res.status(404).send({ error: 'Block not found' })

			const updateBlock = await Blocks.findByIdAndUpdate(
				id,
				{
					...block,
				},
				{ new: true }
			)

			return res.status(200).send({ block: updateBlock })
		} catch (error) {
			console.error(error)
			return res.status(500).send({ error: error })
		}
	},

	deleteBlock: async (req: Request, res: Response) => {
		const { id } = req.params

		try {
			const blockExist = await Blocks.exists({ _id: id })

			!blockExist && res.status(404).send({ error: 'Block not found' })

			await Blocks.findByIdAndDelete(id)

			return res.status(200).send({ message: 'Block deleted' })
		} catch (error) {
			console.error(error)
			return res.status(500).send({ error: error })
		}
	},

	getBlockByService: async (req: Request, res: Response) => {
		const { id, serviceId } = req.params

		try {
			const blockExist = await Blocks.exists({ _id: id })

			!blockExist && res.status(404).send({ error: 'Block not found' })

			const block = await Blocks.find({ service: serviceId })

			return res.status(200).send({ block })
		} catch (error) {
			console.error(error)
			return res.status(500).send({ error: error })
		}
	},
}
