import { model, models, Schema, Types } from 'mongoose'
import { BookingDocument } from '@import/interface'

export default models.bookings ||
	model<BookingDocument>(
		'Bookings',
		new Schema({
			user: { type: Types.ObjectId, ref: 'Users' },
			block: { type: Types.ObjectId, ref: 'Blocks' },
			services: [{ type: Types.ObjectId, ref: 'Services' }],
			date: Date,
			time: Number,
			status: { type: String, default: 'pending', enum: ['pending', 'confirmed', 'cancelled', 'completed'] },
			payment: { type: Types.ObjectId, ref: 'Payments' },
		})
	)
