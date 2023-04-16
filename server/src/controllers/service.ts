import { Response, Request } from 'express'
import { Services } from '@import/database'

export const serviceController = {
	getServices: async (req: Request, res: Response) => {
		try {
			const services = await Services.find()
			return res.status(200).send({ services })
		} catch (error) {
			console.error(error)
			return res.status(500).send({ error: error })
		}
	},

	getService: async (req: Request, res: Response) => {
		const { id } = req.params

		try {
			const serviceExist = await Services.exists({ _id: id })

			!serviceExist && res.status(404).send({ error: 'Service not found' })

			const service = await Services.findById(id)

			return res.status(200).send({ service })
		} catch (error) {
			console.error(error)
			return res.status(500).send({ error: error })
		}
	},

	createService: async (req: Request, res: Response) => {
		const { service } = req.body

		try {
			const newService = await Services.create(service)

			return res.status(200).send({ service: newService })
		} catch (error) {
			console.error(error)
			return res.status(500).send({ error: error })
		}
	},

	updateService: async (req: Request, res: Response) => {
		const { id } = req.params
		const { service } = req.body

		try {
			const serviceExist = await Services.exists({ _id: id })

			!serviceExist && res.status(404).send({ error: 'Service not found' })

			const updateService = await Services.findByIdAndUpdate(
				id,
				{
					...service,
				},
				{ new: true }
			)

			return res.status(200).send({ service: updateService })
		} catch (error) {
			console.error(error)
			return res.status(500).send({ error: error })
		}
	},

	deleteService: async (req: Request, res: Response) => {
		const { id } = req.params

		try {
			const serviceExist = await Services.exists({ _id: id })

			!serviceExist && res.status(404).send({ error: 'Service not found' })

			const deleteService = await Services.findByIdAndDelete(id)

			return res.status(200).send({ service: deleteService })
		} catch (error) {
			console.error(error)
			return res.status(500).send({ error: error })
		}
	},
}
