import { RouteProps } from '@import/types'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useAuth } from './authContext'
import { toast } from 'react-toastify'

const PrivateRoute = ({ children }: RouteProps) => {
	const { user } = useAuth()
	const router = useRouter()

	useEffect(() => {
		if (!user) {
			toast.warning('You must be logged in to view that page')
			return router.push('/')
		}

		if (!user.isVerified) {
			toast.error('You must verify your phone to view that page')
			return router.push('/verify')
		}
	}, [])

	return user ? <>{children}</> : null
}

export default PrivateRoute
