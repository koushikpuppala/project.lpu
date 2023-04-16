import { RouteProps } from '@import/types'
import { createContext, useContext, useEffect, useState } from 'react'
import { AuthService, auth } from '@import/services'
import { AuthContextProps, UserDocument } from '@import/interface'
import { useAuthState } from 'react-firebase-hooks/auth'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { onAuthStateChanged } from 'firebase/auth'
import { LoadingSpinner } from '@import/components'
import { toast } from 'react-toastify'

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps)

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }: RouteProps) => {
	const [loading, setLoading] = useState(true)
	const [user, setUser] = useState<UserDocument | null>()
	const router = useRouter()

	const login = async () => {
		const { user } = await AuthService.login()
		const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/user`, {
			user: {
				uid: user?.uid,
				name: user?.displayName,
				email: user?.email,
				avatar: user?.photoURL,
			},
		})
		console.log(data)
		setUser(data.user)
		if (!data.isVerified) return router.push('/verify')
	}

	const logout = async () => {
		await AuthService.logout()
		setUser(null)
		router.push('/')
	}

	useEffect(() => {
		console.log('Test successful')
		onAuthStateChanged(auth, async user => {
			if (user) {
				const { data } = await axios.get(
					`${process.env.NEXT_PUBLIC_API_URL}/user/${user.uid}`
				)
				setUser(data.user)
				console.log(data.user)
			} else {
				setUser(null)
				return router.push('/')
			}
			console.log('test successful')
			setLoading(false)
		})
		setTimeout(() => {
			setLoading(false)
		}, 1000)
	}, [])

	if (!loading)
		return (
			<AuthContext.Provider value={{ user, login, logout, setUser }}>
				{children}
			</AuthContext.Provider>
		)
}
