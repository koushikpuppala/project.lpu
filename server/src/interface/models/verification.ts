import { Document } from 'mongoose'

export interface VerificationDocument extends Document {
	user: string
	phone: string
	token: number
	createdAt: Date
}
