import { model, models, Schema } from 'mongoose'
import { VerificationDocument } from '@import/interface'

export default models.Verifications ||
	model<VerificationDocument>(
		'Verifications',
		new Schema({
			user: {
				type: String,
				ref: 'Users',
			},
			phone: String,
			token: Number,
			createdAt: {
				type: Date,
				default: Date.now,
				expires: 300,
			},
		})
	)
