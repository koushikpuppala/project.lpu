import { AosOptions } from 'aos'
import { FirebaseOptions } from 'firebase/app'
import { ConnectOptions } from 'mongoose'

export interface Config {
	secret: string
	firebase: FirebaseOptions
	aos: AosOptions
	mongodb: {
		uri: string
		options: ConnectOptions
	}
}
