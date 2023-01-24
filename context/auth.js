import { useEffect, useState, createContext, useContext } from 'react'
import { AuthService } from '../config'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import LoadingSpinner from '../components/loading'

const authContext = createContext()

export const useAuth = () => {
	return useContext(authContext)
}

export const AuthProvider = (props) => {
	const [user, setUser] = useState(null)
	const [error, setError] = useState()

	const login = async () => {
		const { error, user } = await AuthService.login()
		console.log(user, error)
		setUser(user ?? null)
		setError(error ?? '')
		window.location.href = '/profile'
	}

	const logout = async () => {
		await AuthService.logout()
		setUser(null)
		window.location.href = '/'
	}

	return (
		<authContext.Provider
			value={{
				user,
				error,
				login,
				logout,
				setUser,
			}}
			{...props}
		/>
	)
}

export const AuthStateChange = ({ children }) => {
	const auth = getAuth()
	const { setUser } = useAuth()
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			setUser(user)
			setLoading(false)
		})
	}, [])

	if (loading) {
		return <LoadingSpinner />
	}

	return children
}
