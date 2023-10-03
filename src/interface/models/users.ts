import { Document } from 'mongoose'
import { BookingDocument } from './Bookings'
import { PaymentDocument } from './Payments'

export interface UserDocument extends Document {
	uid: string
	name: string
	email: string
	avatar: string
	phone: number
	role: 'user' | 'admin'
	bookings: BookingDocument[]
	payments: PaymentDocument[]
	verified: true | false
	verifyToken: number
	verifyTokenExpire: Date
	credentials: Object
}
