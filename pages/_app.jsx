import 'aos/dist/aos.css'
import '../styles/globals.css'
import { AuthProvider, AuthStateChange } from '../context'
import { useEffect } from 'react'
import AOS from 'aos'

export default function App({ Component, pageProps }) {
	useEffect(() => {
		AOS.init({
			offset: 100,
			duration: 1000,
			once: false,
			mirror: true,
		})
	}, [])

	return (
		<AuthProvider>
			<AuthStateChange>
				<Component {...pageProps} />
			</AuthStateChange>
		</AuthProvider>
	)
}
