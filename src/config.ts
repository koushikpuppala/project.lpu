import { Config } from '@import/interface'

export const config: Config = {
	secret: process.env.JWT_SECRET!,
	firebase: {
		apiKey: 'AIzaSyAPlo65QG7IEFgega7RAPAHIm8RZiQo4wA',
		authDomain: 'auth.bookmycut.xyz',
		projectId: 'project-lpu',
		storageBucket: 'project-lpu.appspot.com',
		messagingSenderId: '354555805743',
		appId: '1:354555805743:web:0ba902b3e1bd4b0010c6da',
		measurementId: 'G-3G54H42ZB1',
	},
	aos: {
		offset: 100,
		duration: 1000,
		once: false,
		mirror: true,
		useClassNames: true,
	},
}
