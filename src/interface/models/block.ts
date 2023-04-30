import { Document, Types } from 'mongoose'

export interface BlockDocument extends Document {
	name: string
	services: Types.ObjectId[]
}
