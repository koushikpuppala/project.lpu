import { initializeApp, getApps } from 'firebase/app'
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { getAnalytics } from 'firebase/analytics'
import { config } from '@import/config'

if (!getApps().length) {
	initializeApp(config.firebase)
	if (typeof window !== 'undefined') {
		if ('measurementId' in config.firebase) {
			getAnalytics(initializeApp(config.firebase))
		}
	}
}

export const auth = getAuth()

const login = async () => {
	const provider = new GoogleAuthProvider()
	try {
		const User = await signInWithPopup(auth, provider)
		return {
			user: User.user,
		}
	} catch (error) {
		return { user: null }
	}
}

const logout = async () => {
	try {
		await auth.signOut()
	} catch (error) {}
}

export const AuthService = {
	login,
	logout,
}
