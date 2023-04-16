import { model, models, Schema } from 'mongoose'
import { BlockDocument } from '@import/interface'

export default models.Blocks ||
	model<BlockDocument>(
		'Blocks',
		new Schema({
			name: String,
			services: [{ type: Schema.Types.ObjectId, ref: 'Services' }],
		})
	)
