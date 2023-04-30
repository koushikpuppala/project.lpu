import { Document, Types } from 'mongoose'

export interface BookingDocument extends Document {
	paymentId: Types.ObjectId
	userId: Types.ObjectId
	services: Types.ObjectId[]
	date: Date
	startTime: Date
	endTime: Date
	price: number
	isPaid: boolean
	isCancelled: boolean
	isCompleted: boolean
}
