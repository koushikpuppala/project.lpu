import { model, models, Schema, Types } from 'mongoose'
import { PaymentDocument } from '@import/interface'

export default models.payments ||
	model<PaymentDocument>(
		'Payments',
		new Schema({
			user: { type: Types.ObjectId, ref: 'Users' },
			booking: { type: Types.ObjectId, ref: 'Bookings' },
			amount: Number,
			payment: String,
			order: String,
			status: { type: String, default: 'pending', enum: ['pending', 'success', 'failed'] },
			signature: String,
		})
	)
