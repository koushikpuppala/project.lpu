import { model, Schema } from 'mongoose'
import { VerificationDocument } from '@import/interface'

export default model<VerificationDocument>(
	'Verifications',
	new Schema({
		user: {
			type: Schema.Types.ObjectId,
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
