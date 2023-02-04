import { useRouter } from 'next/router'
import { useAuth } from './auth'
import Loading from '../components/loading'
import { useEffect } from 'react'

export const withPublic = Component => {
	const WithPublic = props => {
		const auth = useAuth()
		return (
			<Component
				auth={auth}
				{...props}
			/>
		)
	}
	return WithPublic
}
export const withProtected = Component => {
	const WithProtected = props => {
		const auth = useAuth()
		const router = useRouter()
		const isVerified = localStorage.getItem('isVerified') === 'true' ? true : false

		if (!auth.user) {
			useEffect(() => {
				router.push('/', '/', { shallow: true })
			}, [])
			return <Loading />
		}

		if (!isVerified) {
			useEffect(() => {
				router.push('/verify', '/verify', { shallow: true })
			}, [])
			return <Loading />
		}

		return (
			<Component
				auth={auth}
				{...props}
			/>
		)
	}
	return WithProtected
}

export const withVerified = Component => {
	const WithVerified = props => {
		const auth = useAuth()
		const router = useRouter()

		if (!auth.user) {
			useEffect(() => {
				router.push('/', '/', { shallow: true })
			}, [])
			return <Loading />
		} else if (localStorage.getItem('isVerified') === 'true') {
			useEffect(() => {
				router.push('/profile', '/profile', { shallow: true })
			}, [])
			return <Loading />
		}

		return (
			<Component
				auth={auth}
				{...props}
			/>
		)
	}
	return WithVerified
}
