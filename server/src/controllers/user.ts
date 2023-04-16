import { Request, Response } from 'express'
import { Users } from '@import/database'

export const userController = {
	createUser: async (req: Request, res: Response) => {
		const { user } = req.body

		try {
			const userExist = await Users.exists({ _id: user._id })

			userExist &&
				res.status(200).send({
					user: await Users.findOne({ _id: user._id }),
				})

			const newUser = await Users.create(user)

			return res.status(200).send({ user: newUser })
		} catch (error) {
			console.error(error)

			return res.status(500).send({ error: error })
		}
	},

	getUser: async (req: Request, res: Response) => {
		const { id } = req.params

		try {
			const userExist = await Users.exists({ uid: id })

			!userExist && res.status(404).send({ error: 'User not found' })

			const User = await Users.findOne({
				uid: id,
			})

			return res.status(200).send({ user: User })
		} catch (error) {
			console.error(error)
			return res.status(500).send({ error: error })
		}
	},

	getUsers: async (req: Request, res: Response) => {
		try {
			const users = await Users.find()

			return res.status(200).send({ users })
		} catch (error) {
			console.error(error)
			return res.status(500).send({ error: error })
		}
	},

	updateUser: async (req: Request, res: Response) => {
		const { id } = req.params
		const { user } = req.body

		try {
			const userExist = await Users.exists({ _id: id })

			!userExist && res.status(404).send({ error: 'User not found' })

			const User = await Users.findByIdAndUpdate(id, user, { new: true })

			return res.status(200).send({ user: User })
		} catch (error) {
			console.error(error)
			return res.status(500).send({ error: error })
		}
	},

	deleteUser: async (req: Request, res: Response) => {
		const { id } = req.params

		try {
			const userExist = await Users.exists({ _id: id })

			!userExist && res.status(404).send({ error: 'User not found' })

			await Users.findByIdAndDelete(id)

			return res.status(200).send({ message: 'User deleted' })
		} catch (error) {
			console.error(error)
			return res.status(500).send({ error: error })
		}
	},

	getUserBookings: async (req: Request, res: Response) => {
		const { id } = req.params

		try {
			const userExist = await Users.exists({ _id: id })

			!userExist && res.status(404).send({ error: 'User not found' })

			const Bookings = await Users.findById(id).populate('bookings')

			return res.status(200).send({ bookings: Bookings?.bookings })
		} catch (error) {
			console.error(error)
			return res.status(500).send({ error: error })
		}
	},

	getUserPayments: async (req: Request, res: Response) => {
		const { id } = req.params

		try {
			const userExist = await Users.exists({ _id: id })

			!userExist && res.status(404).send({ error: 'User not found' })

			const Payments = await Users.findById(id).populate('payments')

			return res.status(200).send({ payments: Payments?.payments })
		} catch (error) {
			console.error(error)
			return res.status(500).send({ error: error })
		}
	},

	getUserBookingsByDate: async (req: Request, res: Response) => {
		const { id } = req.params
		const { date } = req.body

		try {
			const userExist = await Users.exists({ _id: id })

			!userExist && res.status(404).send({ error: 'User not found' })

			const Bookings = await Users.findById(id).populate({
				path: 'bookings',
				match: { date: date },
			})

			return res.status(200).send({ bookings: Bookings?.bookings })
		} catch (error) {
			console.error(error)
			return res.status(500).send({ error: error })
		}
	},

	getUserBookingsByService: async (req: Request, res: Response) => {
		const { id } = req.params
		const { service } = req.body

		try {
			const userExist = await Users.exists({ _id: id })

			!userExist && res.status(404).send({ error: 'User not found' })

			const Bookings = await Users.findById(id).populate({
				path: 'bookings',
				match: { service: service },
			})

			return res.status(200).send({ bookings: Bookings?.bookings })
		} catch (error) {
			console.error(error)
			return res.status(500).send({ error: error })
		}
	},

	getUserBookingsByServiceAndDate: async (req: Request, res: Response) => {
		const { id } = req.params
		const { service, date } = req.body

		try {
			const userExist = await Users.exists({ _id: id })

			!userExist && res.status(404).send({ error: 'User not found' })

			const Bookings = await Users.findById(id).populate({
				path: 'bookings',
				match: { service: service, date: date },
			})

			return res.status(200).send({ bookings: Bookings?.bookings })
		} catch (error) {
			console.error(error)
			return res.status(500).send({ error: error })
		}
	},
}
