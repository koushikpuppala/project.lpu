import { model, Schema } from 'mongoose'
import { PaymentDocument } from '@import/interface'

export default model<PaymentDocument>(
	'Payments',
	new Schema({
		userId: {
			type: Schema.Types.ObjectId,
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
