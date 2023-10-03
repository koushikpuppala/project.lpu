import { model, models, Schema, Types } from 'mongoose'
import { ServiceDocument } from '@import/interface'

export default models.services ||
	model<ServiceDocument>(
		'Services',
		new Schema({
			name: String,
			description: String,
			price: Number,
			duration: Number,
		})
	)
