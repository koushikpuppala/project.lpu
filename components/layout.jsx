import Navbar from './navbar'

const Layout = ({ children, auth }) => {
	return (
		<>
			<Navbar auth={auth} />
			<section
				id='hero'
				className='hero flex w-full items-center justify-center'>
				{children}
			</section>
		</>
	)
}

export default Layout
