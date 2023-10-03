import { Config } from '@import/interface'

export const config: Config = {
	secret: process.env.NEXT_PUBLIC_JWT_SECRET!,
	firebase: {
		apiKey: process.env.NEXT_PUBLIC_FIREBASE_API,
		authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH,
		projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT,
		storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE,
		messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING,
		appId: process.env.NEXT_PUBLIC_FIREBASE_APP,
		measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT,
	},
	aos: {
		offset: 100,
		duration: 1000,
		once: false,
		mirror: true,
		useClassNames: true,
	},
	mongodb: {
		uri: `mongodb+srv://${process.env.NEXT_PUBLIC_MONGODB_USER}:${process.env.NEXT_PUBLIC_MONGODB_PASS}@${process.env.NEXT_PUBLIC_MONGODB_DATA}.mongodb.net/${process.env.NEXT_PUBLIC_MONGODB_NAME}?retryWrites=true&w=majority`,
		options: {
			connectTimeoutMS: 10000,
			socketTimeoutMS: 45000,
			serverSelectionTimeoutMS: 5000,
			family: 4,
			maxPoolSize: 100,
			minPoolSize: 10,
		},
	},
}
