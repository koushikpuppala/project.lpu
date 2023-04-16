import { model, Schema } from 'mongoose'
import { ServiceDocument } from '@import/interface'

export default model<ServiceDocument>(
	'Services',
	new Schema({
		name: String,
		description: String,
		price: Number,
		duration: Number,
	})
)
