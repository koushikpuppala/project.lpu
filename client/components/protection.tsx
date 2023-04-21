import { RouteProps } from '@import/types'
import { useRouter } from 'next/navigation'
import { Children, useEffect, useState } from 'react'
import { useAuth } from './authContext'
import { NextComponentType } from 'next'
import LoadingSpinner from './loading'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '@import/src/services'
import { toast } from 'react-toastify'

const PrivateRoute = ({ children }: RouteProps) => {
	const { user } = useAuth()
	// const [user, loading, error] = useAuthState(auth)
	const [loading, setLoading] = useState(true)
	const router = useRouter()

	useEffect(() => {
		console.log(user)
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

export const PublicRoute = (Component: NextComponentType) => {
	const publicRoute = (props: any) => {
		const auth = useAuth()
		return (
			<Component
				auth={auth}
				{...props}
			/>
		)
	}

	return publicRoute
}

export const ProtectedRoute = (Component: NextComponentType) => {
	const protectedRoute = (props: any) => {
		const auth = useAuth()
		const router = useRouter()

		useEffect(() => {
			console.log(auth.user)
			if (!auth.user) return router.push('/')
			toast.warning('You must be logged in to view that page')

			if (!auth.user.isVerified) return router.push('/verify')
			toast.error('You must verify your phone to view that page')
		}, [router, auth.user])

		return (
			<Component
				auth={auth}
				{...props}
			/>
		)
	}

	return protectedRoute
}
