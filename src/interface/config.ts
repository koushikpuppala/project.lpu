import { AosOptions } from 'aos'
import { FirebaseOptions } from 'firebase/app'

export interface Config {
	firebase: FirebaseOptions
	aos: AosOptions
}
