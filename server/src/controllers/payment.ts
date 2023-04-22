import { Request, Response } from 'express'
import { Payments } from '@import/database'
import Razorpay from 'razorpay'
import { config } from '@import/config'
import crypto from 'crypto'

const instance = new Razorpay({
	key_id: config.razorpay.key_id,
	key_secret: config.razorpay.key_secret,
})

export const paymentController = {
	getPayments: async (req: Request, res: Response) => {
		try {
			const payments = await Payments.find()
			return res.status(200).send({ payments })
		} catch (error) {
			console.error(error)
			return res.status(500).send({ error: error })
		}
	},

	getPayment: async (req: Request, res: Response) => {
		const { id } = req.params

		try {
			const paymentsExist = await Payments.exists({ _id: id })

			!paymentsExist && res.status(404).send({ error: 'Payment not found' })

			const payment = await Payments.findById(id)

			return res.status(200).send({ payment })
		} catch (error) {
			console.error(error)
			return res.status(500).send({ error: error })
		}
	},

	createPayment: async (req: Request, res: Response) => {
		const { payment } = req.body

		try {
			const newPayment = await Payments.create(payment)

			return res.status(200).send({ payment: newPayment })
		} catch (error) {
			console.error(error)
			return res.status(500).send({ error: error })
		}
	},

	updatePayment: async (req: Request, res: Response) => {
		const { id } = req.params
		const { payment } = req.body

		try {
			const paymentExist = await Payments.exists({ _id: id })

			!paymentExist && res.status(404).send({ error: 'Payment not found' })

			const updatePayment = await Payments.findByIdAndUpdate(
				id,
				{
					...payment,
				},
				{ new: true }
			)

			return res.status(200).send({ payment: updatePayment })
		} catch (error) {
			console.error(error)
			return res.status(500).send({ error: error })
		}
	},

	deletePayment: async (req: Request, res: Response) => {
		const { id } = req.params

		try {
			const paymentExist = await Payments.exists({ _id: id })

			!paymentExist && res.status(404).send({ error: 'Payment not found' })

			const deletePayment = await Payments.findByIdAndDelete(id)

			return res.status(200).send({ payment: deletePayment })
		} catch (error) {
			console.error(error)
			return res.status(500).send({ error: error })
		}
	},

	createOrder: async (req: Request, res: Response) => {
		const { amount, user } = req.body

		try {
			const options = {
				amount: Number(amount * 100),
				currency: 'INR',
				receipt: `order_${user.phone}_${new Date().getTime()}`,
			}

			const order = await instance.orders.create(options)

			return res.status(200).send({ order, key: config.razorpay.key_id })
		} catch (error) {
			console.error(error)
			return res.status(500).send({ error: error })
		}
	},

	verifyPayment: async (req: Request, res: Response) => {
		const { razorpay_order_id, razorpay_payment_id, razorpay_signature, user, order } = req.body

		const body = razorpay_order_id + '|' + razorpay_payment_id

		console.log(req.body)

		try {
			const expectedSignature = crypto
				.createHmac('sha256', config.razorpay.key_secret)
				.update(body.toString())
				.digest('hex')

			const isVerified = expectedSignature === razorpay_signature

			if (isVerified) {
				const payment = await Payments.create({
					paymentId: razorpay_order_id,
					orderId: razorpay_payment_id,
					signature: razorpay_signature,
					amount: order.amount,
					userId: user.uid,
					isPaid: true,
				})
				return res.status(200).send({ message: 'Payment successful', payment })
			}

			return res.status(400).send({ error: 'Payment failed' })
		} catch (error) {
			console.error(error)
			return res.status(500).send({ error: error })
		}
	},
}
