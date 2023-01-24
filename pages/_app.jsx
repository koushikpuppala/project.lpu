import { AuthProvider, AuthStateChange } from '../context'

export default function App({ Component, pageProps }) {
	return (
		<AuthProvider>
			<AuthStateChange>
				<Component {...pageProps} />
			</AuthStateChange>
		</AuthProvider>
	)
}
