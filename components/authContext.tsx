import { RouteProps } from '@import/types'
import { createContext, useContext, useEffect, useState } from 'react'
import { AuthService, auth } from '@import/services'
import { AuthContextProps, UserDocument } from '@import/interface'
import axios from 'axios'
import { useRouter } from 'next/router'
import { onAuthStateChanged } from 'firebase/auth'
import LoadingSpinner from './loading'

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps)

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }: RouteProps) => {
	const [user, setUser] = useState<UserDocument | null>()
	const router = useRouter()

	const login = async () => {
		try {
			const { user } = await AuthService.login()
			const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/user`, {
				user: {
					uid: user?.uid,
					name: user?.displayName,
					email: user?.email,
					avatar: user?.photoURL,
				},
			})
			setUser(data.user)
			if (!data.isVerified) return router.push('/verify', '/verify', { shallow: true })
			return router.push('/profile', '/profile', { shallow: true })
		} catch (error) {}
	}

	const logout = async () => {
		try {
			await AuthService.logout()
			setUser(null)
			return router.push('/', '/', { shallow: true })
		} catch (error) {}
	}

	return (
		<AuthContext.Provider value={{ user, login, logout, setUser }}>
			{children}
		</AuthContext.Provider>
	)
}

export const AuthStateChanged = ({ children }: RouteProps) => {
	const { setUser } = useAuth()
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		onAuthStateChanged(auth, async user => {
			if (user) {
				try {
					const { data } = await axios.get(
						`${process.env.NEXT_PUBLIC_API_URL}/user/${user.uid}`
					)
					setUser(data.user)
				} catch (error) {}
			} else {
				setUser(user)
			}
			setLoading(false)
		})
	}, [])

	if (loading) return <LoadingSpinner />

	return <>{children}</>
}
