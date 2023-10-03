import { Document } from 'mongoose'
import { ServiceDocument } from './Services'

export interface BlockDocument extends Document {
	name: string
	services: ServiceDocument[]
}
