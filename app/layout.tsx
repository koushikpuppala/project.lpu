import { ThemeContext } from '@import/context'
import { ChildProps } from '@import/interface'

const RootLayout = ({ children }: ChildProps) => {
	return (
		<html lang='en'>
			<ThemeContext>
				<body>{children}</body>
			</ThemeContext>
		</html>
	)
}

export default RootLayout
