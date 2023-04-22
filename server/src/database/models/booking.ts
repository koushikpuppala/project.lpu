import { model, models, Schema } from 'mongoose'
import { BookingDocument } from '@import/interface'

export default models.Bookings ||
	model<BookingDocument>(
		'Bookings',
		new Schema({
			paymentId: {
				type: Schema.Types.ObjectId,
				ref: 'Payments',
			},
			userId: {
				type: String,
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
