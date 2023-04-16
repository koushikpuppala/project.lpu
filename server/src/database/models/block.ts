import { model, Schema } from 'mongoose'
import { BlockDocument } from '@import/interface'

export default model<BlockDocument>(
	'Blocks',
	new Schema({
		name: String,
		services: [{ type: Schema.Types.ObjectId, ref: 'Services' }],
	})
)
