import { model, models, Schema } from 'mongoose'
import { ServiceDocument } from '@import/interface'

export default models.Services ||
	model<ServiceDocument>(
		'Services',
		new Schema({
			name: String,
			description: String,
			price: Number,
			duration: Number,
		})
	)
