import { model, Schema } from 'mongoose'
import { BookingDocument } from '@import/interface'

export default model<BookingDocument>(
	'Bookings',
	new Schema({
		paymentId: {
			type: Schema.Types.ObjectId,
			ref: 'Payments',
		},
		userId: {
			type: Schema.Types.ObjectId,
			ref: 'Users',
		},
		services: [
			{
				type: Schema.Types.ObjectId,
				ref: 'Services',
			},
		],
		date: Date,
		startTime: Date,
		endTime: Date,
		price: Number,
		isPaid: {
			type: Boolean,
			default: false,
		},
		isCancelled: {
			type: Boolean,
			default: false,
		},
		isCompleted: {
			type: Boolean,
			default: false,
		},
	})
)
