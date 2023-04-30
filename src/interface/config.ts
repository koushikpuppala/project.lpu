import { AosOptions } from 'aos'
import { FirebaseOptions } from 'firebase/app'

export interface Config {
	secret: string
	firebase: FirebaseOptions
	aos: AosOptions
}
