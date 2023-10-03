import { Document } from 'mongoose'
import { BookingDocument } from './Bookings'
import { UserDocument } from './Users'

export interface PaymentDocument extends Document {
	user: UserDocument
	booking: BookingDocument
	amount: number
	payment: string
	order: string
	status: 'pending' | 'success' | 'failed'
	signature: string
}
