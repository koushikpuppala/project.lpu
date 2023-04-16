import { Document, Types } from 'mongoose'

export interface UserDocument extends Document {
	uid: string
	name: string
	email: string
	avatar: string
	phone: number
	bookings: Types.ObjectId[]
	payments: Types.ObjectId[]
	role: 'user' | 'admin'
	credential: object
	isVerified: boolean
}
