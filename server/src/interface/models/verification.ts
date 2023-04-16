import { Document, Types } from 'mongoose'

export interface VerificationDocument extends Document {
	user: Types.ObjectId
	phone: string
	token: number
	createdAt: Date
}
