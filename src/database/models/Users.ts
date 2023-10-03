import { model, models, Schema, Types } from 'mongoose'
import { UserDocument } from '@import/interface'

export default models.users ||
	model<UserDocument>(
		'Users',
		new Schema({
			uid: String,
			name: String,
			email: String,
			avatar: String,
			phone: Number,
			role: { type: String, default: 'user', enum: ['user', 'admin'] },
			bookings: [{ type: Types.ObjectId, ref: 'Bookings' }],
			payments: [{ type: Types.ObjectId, ref: 'Payments' }],
			verified: { type: Boolean, default: false },
			verifyToken: Number,
			verifyTokenExpire: Date,
			credentials: Object,
		})
	)
