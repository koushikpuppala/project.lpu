import * as dotenv from 'dotenv'
import { Config } from '@import/interface'

dotenv.config({
	path: process.env.NODE_ENV === 'production' ? '.env' : '.env.local',
})

export const config: Config = {
	hostname: process.env.HOSTNAME!,
	port: 8080,
	whitelist: [
		'http://127.0.0.1:3000',
		'localhost',
		'http://localhost:3000',
		'https://project-lpu.vercel.app',
	],
	mongodb: {
		uri: `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@project-lpu.lwzwpqy.mongodb.net/${process.env.MONGO_DATA}?retryWrites=true&w=majority`,
		options: {
			connectTimeoutMS: 10000,
			socketTimeoutMS: 45000,
			serverSelectionTimeoutMS: 5000,
			family: 4,
			maxPoolSize: 100,
			minPoolSize: 10,
		},
	},
	twilio: {
		accountSid: process.env.TWILIO_ACCOUNT_SID!,
		authToken: process.env.TWILIO_AUTH_TOKEN!,
		messagingServiceSid: process.env.TWILIO_MESSAGING_SERVICE_SID!,
		phoneNumber: process.env.TWILIO_PHONE_NUMBER!,
	},
	razorpay: {
		key_id: process.env.RAZORPAY_KEY_ID!,
		key_secret: process.env.RAZORPAY_KEY_SECRET!,
	},
}
