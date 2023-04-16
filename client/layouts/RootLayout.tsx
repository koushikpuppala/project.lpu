import { Navbar } from '@import/components'
import { LayoutProps } from '@import/interface'

const RootLayout = ({ children }: LayoutProps) => {
	return (
		<>
			<Navbar />
			<section
				id='hero'
				className='hero flex w-full items-center justify-center'>
				{children}
			</section>
		</>
	)
}

export default RootLayout
