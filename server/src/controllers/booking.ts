import { Request, Response } from 'express'
import { Bookings } from '@import/database'

export const bookingController = {
	getBookings: async (req: Request, res: Response) => {
		try {
			const bookings = await Bookings.find()
			return res.status(200).send({ bookings })
		} catch (error) {
			console.error(error)
			return res.status(500).send({ error: error })
		}
	},

	getBooking: async (req: Request, res: Response) => {
		const { id } = req.params

		try {
			const bookingExist = await Bookings.exists({ _id: id })

			!bookingExist && res.status(404).send({ error: 'Booking not found' })

			const booking = await Bookings.findById(id)

			return res.status(200).send({ booking })
		} catch (error) {
			console.error(error)
			return res.status(500).send({ error: error })
		}
	},

	createBooking: async (req: Request, res: Response) => {
		const { booking } = req.body

		try {
			const newBooking = await Bookings.create(booking)

			return res.status(200).send({ booking: newBooking })
		} catch (error) {
			console.error(error)
			return res.status(500).send({ error: error })
		}
	},

	updateBooking: async (req: Request, res: Response) => {
		const { id } = req.params
		const { booking } = req.body

		try {
			const bookingExist = await Bookings.exists({ _id: id })

			!bookingExist && res.status(404).send({ error: 'Booking not found' })

			const Booking = await Bookings.findByIdAndUpdate(
				id,
				{
					...booking,
				},
				{ new: true }
			)

			return res.status(200).send({ booking: Booking })
		} catch (error) {
			console.error(error)
			return res.status(500).send({ error: error })
		}
	},

	deleteBooking: async (req: Request, res: Response) => {
		const { id } = req.params

		try {
			const bookingExist = await Bookings.exists({ _id: id })

			!bookingExist && res.status(404).send({ error: 'Booking not found' })

			Bookings.findByIdAndDelete(id)

			return res.status(200).send({ message: 'Booking deleted' })
		} catch (error) {
			console.error(error)
			return res.status(500).send({ error: error })
		}
	},

	getServiceBookings: async (req: Request, res: Response) => {
		const { id } = req.params

		try {
			const bookingExist = await Bookings.exists({ _id: id })

			!bookingExist && res.status(404).send({ error: 'Booking not found' })

			const Services = await Bookings.findById(id).populate('services')

			return res.status(200).send({ services: Services })
		} catch (error) {
			console.error(error)
			return res.status(500).send({ error: error })
		}
	},
}
