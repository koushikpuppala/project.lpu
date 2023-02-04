import 'aos/dist/aos.css'
import 'animate.css'
import '../styles/globals.css'
import { AuthProvider, AuthStateChange } from '../context'
import { useEffect } from 'react'
import AOS from 'aos'
import { ThemeProvider } from '@mui/material/styles'
import { CacheProvider } from '@emotion/react'
import { CssBaseline } from '@mui/material'
import { ToastContainer, Zoom } from 'react-toastify'
import theme from '../src/theme'
import createEmotionCache from '../src/createEmotionCache'

export default function App({ Component, emotionCache = createEmotionCache(), pageProps }) {
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
				<CacheProvider value={emotionCache}>
					<ThemeProvider theme={theme}>
						<CssBaseline enableColorScheme={true}>
							<ToastContainer
								theme='dark'
								position='top-center'
								transition={Zoom}
							/>
							<Component {...pageProps} />
						</CssBaseline>
					</ThemeProvider>
				</CacheProvider>
			</AuthStateChange>
		</AuthProvider>
	)
}
