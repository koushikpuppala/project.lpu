import { Document } from 'mongoose'

export interface ServiceDocument extends Document {
	name: string
	description: string
	price: number
	duration: number
}
