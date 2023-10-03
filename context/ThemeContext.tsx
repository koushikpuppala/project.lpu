'use client'

import { init } from 'aos'
import { useEffect } from 'react'
import { config } from '@import/config'
import { CacheProvider } from '@emotion/react'
import { ChildProps } from '@import/interface'
import { ToastContainer, Zoom } from 'react-toastify'
import { createEmotionCache, theme } from '@import/theme'
import { CssBaseline, ThemeProvider } from '@mui/material'

const ThemeContext = ({ children }: ChildProps) => {
	useEffect(() => {
		init(config.aos)
	}, [])

	return (
		<CacheProvider value={createEmotionCache()}>
			<ThemeProvider theme={theme}>
				<CssBaseline enableColorScheme={true}>
					<ToastContainer
						theme='light'
						position='top-center'
						transition={Zoom}
					/>
					{children}
				</CssBaseline>
			</ThemeProvider>
		</CacheProvider>
	)
}

export default ThemeContext
