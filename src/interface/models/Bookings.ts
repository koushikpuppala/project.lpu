import { Document } from 'mongoose'
import { BlockDocument } from './Blocks'
import { UserDocument } from './Users'
import { ServiceDocument } from './Services'
import { PaymentDocument } from './Payments'

export interface BookingDocument extends Document {
	user: UserDocument
	block: BlockDocument
	services: ServiceDocument[]
	date: Date
	time: number
	status: 'pending' | 'confirmed' | 'cancelled' | 'completed'
	payment: PaymentDocument
}
