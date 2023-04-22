import { Request, Response } from 'express'
import { Users } from '@import/database'

export const userController = {
	createUser: async (req: Request, res: Response) => {
		const { user } = req.body

		try {
			const userExist = await Users.exists({ uid: user.uid })
			console.log(userExist)

			if (userExist)
				return res.status(200).send({
					user: await Users.findOne({ uid: user.uid }),
				})

			console.log('test')

			return res.status(200).send({ user: await Users.create(user) })
		} catch (error) {
			console.error(error)

			res.status(500).send({ error: error })
		}
	},

	getUser: async (req: Request, res: Response) => {
		const { id } = req.params

		try {
			const userExist = await Users.exists({ uid: id })
			console.log(userExist)

			if (!userExist) return res.status(404).send({ error: 'User not found' })

			const User = await Users.findOne({
				uid: id,
			})

			res.status(200).send({ user: User })
		} catch (error) {
			console.error(error)
			res.status(500).send({ error: error })
		}
	},

	getUsers: async (req: Request, res: Response) => {
		try {
			const users = await Users.find()

			res.status(200).send({ users })
		} catch (error) {
			console.error(error)
			res.status(500).send({ error: error })
		}
	},

	updateUser: async (req: Request, res: Response) => {
		const { id } = req.params
		const { user } = req.body

		try {
			const userExist = await Users.exists({ uid: id })

			console.log(userExist)

			if (!userExist) return res.status(404).send({ error: 'User not found' })

			return res.status(200).send({
				user: await Users.findOneAndUpdate(
					{
						uid: id,
					},
					user,
					{ new: true }
				),
			})
		} catch (error) {
			console.error(error)
			res.status(500).send({ error: error })
		}
	},

	deleteUser: async (req: Request, res: Response) => {
		const { id } = req.params

		try {
			const userExist = await Users.exists({ uid: id })

			!userExist && res.status(404).send({ error: 'User not found' })

			await Users.findByIdAndDelete(id)

			res.status(200).send({ message: 'User deleted' })
		} catch (error) {
			console.error(error)
			res.status(500).send({ error: error })
		}
	},

	getUserBookings: async (req: Request, res: Response) => {
		const { id } = req.params

		try {
			const userExist = await Users.exists({ uid: id })

			!userExist && res.status(404).send({ error: 'User not found' })

			const Bookings = await Users.findById(id).populate('bookings')

			res.status(200).send({ bookings: Bookings?.bookings })
		} catch (error) {
			console.error(error)
			res.status(500).send({ error: error })
		}
	},

	getUserPayments: async (req: Request, res: Response) => {
		const { id } = req.params

		try {
			const userExist = await Users.exists({ uid: id })

			!userExist && res.status(404).send({ error: 'User not found' })

			const Payments = await Users.findById(id).populate('payments')

			res.status(200).send({ payments: Payments?.payments })
		} catch (error) {
			console.error(error)
			res.status(500).send({ error: error })
		}
	},

	getUserBookingsByDate: async (req: Request, res: Response) => {
		const { id } = req.params
		const { date } = req.body

		try {
			const userExist = await Users.exists({ uid: id })

			!userExist && res.status(404).send({ error: 'User not found' })

			const Bookings = await Users.findById(id).populate({
				path: 'bookings',
				match: { date: date },
			})

			res.status(200).send({ bookings: Bookings?.bookings })
		} catch (error) {
			console.error(error)
			res.status(500).send({ error: error })
		}
	},

	getUserBookingsByService: async (req: Request, res: Response) => {
		const { id } = req.params
		const { service } = req.body

		try {
			const userExist = await Users.exists({ uid: id })

			!userExist && res.status(404).send({ error: 'User not found' })

			const Bookings = await Users.findById(id).populate({
				path: 'bookings',
				match: { service: service },
			})

			res.status(200).send({ bookings: Bookings?.bookings })
		} catch (error) {
			console.error(error)
			res.status(500).send({ error: error })
		}
	},

	getUserBookingsByServiceAndDate: async (req: Request, res: Response) => {
		const { id } = req.params
		const { service, date } = req.body

		try {
			const userExist = await Users.exists({ uid: id })

			!userExist && res.status(404).send({ error: 'User not found' })

			const Bookings = await Users.findById(id).populate({
				path: 'bookings',
				match: { service: service, date: date },
			})

			res.status(200).send({ bookings: Bookings?.bookings })
		} catch (error) {
			console.error(error)
			res.status(500).send({ error: error })
		}
	},
}
