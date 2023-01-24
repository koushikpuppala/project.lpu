import { useRouter } from 'next/router'
import { useAuth } from './auth'
import Loading from '../components/loading'
import { useEffect } from 'react'

export const withPublic = (Component) => {
	const WithPublic = (props) => {
		const auth = useAuth()
		return <Component auth={auth} {...props} />
	}
	return WithPublic
}
export const withProtected = (Component) => {
	const WithProtected = (props) => {
		const auth = useAuth()
		const router = useRouter()
		if (!auth.user) {
			useEffect(() => {
				router.push('/', '/', { shallow: true })
			}, [])
			return <Loading />
		}
		return <Component auth={auth} {...props} />
	}
	return WithProtected
}
