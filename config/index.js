import { initializeApp, getApps } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'

const firebaseConfig = {
	apiKey: 'AIzaSyAPlo65QG7IEFgega7RAPAHIm8RZiQo4wA',
	authDomain: 'project-lpu.firebaseapp.com',
	projectId: 'project-lpu',
	storageBucket: 'project-lpu.appspot.com',
	messagingSenderId: '354555805743',
	appId: '1:354555805743:web:0ba902b3e1bd4b0010c6da',
	measurementId: 'G-3G54H42ZB1',
}

if (!getApps().length) {
	initializeApp(firebaseConfig)
	if (typeof window !== 'undefined') {
		if ('measurementId' in firebaseConfig) {
			getAnalytics(initializeApp(firebaseConfig))
		}
	}
}

export const auth = getAuth()

export default firebaseConfig

export const AuthService = {
	login: async () => {
		const provider = new GoogleAuthProvider()
		try {
			const UserCredential = await signInWithPopup(auth, provider)
			return {
				user: UserCredential.user,
			}
		} catch (err) {
			return {
				error: err,
			}
		}
	},
	logout: async () => {
		await auth.signOut()
	},
}
