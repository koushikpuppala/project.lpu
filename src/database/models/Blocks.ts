import { model, models, Schema, Types } from 'mongoose'
import { BlockDocument } from '@import/interface'

export default models.blocks ||
	model<BlockDocument>(
		'Blocks',
		new Schema({
			name: String,
			services: [{ type: Types.ObjectId, ref: 'Services' }],
		})
	)
