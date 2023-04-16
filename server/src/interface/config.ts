import { FirebaseOptions } from 'firebase/app'
import { ConnectOptions } from 'mongoose'

export interface Config {
	hostname: string
	port: number
	secret: string
	whitelist: string[]
	mongodb: {
		uri: string
		options: ConnectOptions
	}
	twilio: {
		accountSid: string
		authToken: string
		messagingServiceSid: string
		phoneNumber: string
	}
	razorpay: {
		key_id: string
		key_secret: string
	}
}