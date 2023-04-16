import { Document, Types } from 'mongoose'

export interface PaymentDocument extends Document {
	userId: Types.ObjectId
	bookingId: Types.ObjectId
	amount: number
	isPaid: boolean
	status: 'pending' | 'success' | 'failed'
	paymentId: string
	orderId: string
	signature: string
}
