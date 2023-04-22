import { model, models, Schema } from 'mongoose'
import { PaymentDocument } from '@import/interface'

export default models.Payments ||
	model<PaymentDocument>(
		'Payments',
		new Schema({
			userId: {
				type: String,
				ref: 'Users',
			},
			bookingId: {
				type: Schema.Types.ObjectId,
				ref: 'Bookings',
			},
			amount: Number,
			isPaid: {
				type: Boolean,
				default: false,
			},
			status: {
				type: String,
				enum: ['pending', 'success', 'failed'],
				default: 'pending',
			},
			paymentId: String,
			orderId: String,
			signature: String,
		})
	)
