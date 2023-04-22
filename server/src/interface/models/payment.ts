import { Document, Types } from 'mongoose'

export interface PaymentDocument extends Document {
	userId: string
	bookingId: Types.ObjectId
	amount: number
	isPaid: boolean
	status: 'pending' | 'success' | 'failed'
	paymentId: string
	orderId: string
	signature: string
}
