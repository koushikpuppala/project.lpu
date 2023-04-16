import { model, models, Schema } from 'mongoose'
import { UserDocument } from '@import/interface'

export default models.Users ||
	model<UserDocument>(
		'Users',
		new Schema({
			uid: String,
			name: String,
			email: String,
			avatar: String,
			phone: Number,
			bookings: [
				{
					type: Schema.Types.ObjectId,
					ref: 'Bookings',
				},
			],
			payments: [
				{
					type: Schema.Types.ObjectId,
					ref: 'Payments',
				},
			],
			role: {
				type: String,
				default: 'user',
				enum: ['user', 'admin'],
			},
			credential: Object,
			isVerified: {
				type: Boolean,
				default: false,
			},
		})
	)
