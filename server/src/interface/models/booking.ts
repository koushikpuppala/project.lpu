import { Document, Types } from 'mongoose'

export interface BookingDocument extends Document {
	paymentId: Types.ObjectId
	userId: string
	services: Types.ObjectId[]
	date: Date
	startTime: Date
	endTime: Date
	price: number
	isPaid: boolean
	isCancelled: boolean
	isCompleted: boolean
}
