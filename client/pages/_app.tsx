import 'animate.css'
import 'aos/dist/aos.css'
import '@import/styles/globals.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'react-toastify/dist/ReactToastify.css'

import { init } from 'aos'
import { useEffect } from 'react'
import { ToastContainer, Zoom } from 'react-toastify'
import { AppProps } from 'next/app'
import { CacheProvider } from '@emotion/react'
import { theme, createEmotionCache } from '@import/theme'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { config } from '@import/config'
import { AuthProvider } from '@import/components'

export default function App({ Component, pageProps }: AppProps) {
	useEffect(() => {
		init(config.aos)
	}, [])

	return (
		<AuthProvider>
			<CacheProvider value={createEmotionCache()}>
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
		</AuthProvider>
	)
}
