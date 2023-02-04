import { withPublic } from '../context'
import Layout from '../components/layout'

const Home = ({ auth }) => {
	const { user, login } = auth
	return (
		<Layout auth={auth}>
			<div className='container flex h-screen items-center px-16'>
				<div className='grid auto-cols-auto grid-flow-col'>
					<div className='flex flex-col justify-center text-center'>
						<h1 data-aos='fade-up'>
							We offer modern solutions for growing your business
						</h1>
						<h2
							data-aos='fade-up'
							data-aos-delay='400'>
							We are team of talented designers making websites
						</h2>
						<div
							data-aos='fade-up'
							data-aos-delay='600'>
							<div className='text-lg-start text-center'>
								{user ? (
									<a className='btn-get-started inline-flex items-center justify-center self-center'>
										<span>Welcome, {user.displayName}</span>
										<i className='bi bi-arrow-right'></i>
									</a>
								) : (
									<a
										onClick={login}
										style={{ cursor: 'pointer' }}
										className='btn-get-started inline-flex items-center justify-center self-center'>
										<span>Get Started</span>
										<i className='bi bi-arrow-right'></i>
									</a>
								)}
							</div>
						</div>
					</div>
					<div
						className='hero-img hidden justify-center md:flex'
						data-aos='zoom-out'
						data-aos-delay='200'>
						<img
							src='/hero-img.png'
							alt=''
						/>
					</div>
				</div>
			</div>
		</Layout>
	)
}

export default withPublic(Home)
