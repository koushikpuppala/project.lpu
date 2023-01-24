import { initializeApp, getApps } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'

const firebaseConfig = {
	apiKey: 'AIzaSyDyk_1HIsWgC-ccCp2DkqpdLt8bgTo3J7s',
	authDomain: 'all-applications-testing.firebaseapp.com',
	projectId: 'all-applications-testing',
	storageBucket: 'all-applications-testing.appspot.com',
	messagingSenderId: '999706182692',
	appId: '1:999706182692:web:b1039e08800618791684b1',
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
