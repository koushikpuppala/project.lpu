import { withProtected } from '../context'
import Link from 'next/link'

const Home = ({ auth }) => {
	const { user, error, login, logout, setUser } = auth
	return (
		<>
			<header id='header' className='header fixed-top'>
				<div className='container-fluid container-xl d-flex align-items-center justify-content-between'>
					<a href='/' className='logo d-flex align-items-center'>
						<img src='assets/img/logo.png' alt='' />
						<span>FlexStart</span>
					</a>

					<nav id='navbar' className='navbar'>
						<ul>
							<li>
								<Link className='nav-link scrollto active' href='/'>
									Home
								</Link>
							</li>
							<li>
								<span
									className='getstarted scrollto'
									onClick={user ? logout : login}
									style={{
										cursor: 'pointer',
									}}>
									{user ? 'Logout' : 'Login'}
								</span>
							</li>
						</ul>
						<i className='bi bi-list mobile-nav-toggle'></i>
					</nav>
				</div>
			</header>
			<section id='hero' className='hero d-flex align-items-center'>
				<div className='container'>
					<div className='row'>
						<div className='col-lg-6 d-flex flex-column justify-content-center'>
							<h1>We offer modern solutions for growing your business</h1>
							{/* <h2  data-aos-delay='400'>
								We are team of talented designers making websites with Bootstrap
							</h2> */}
							<div data-aos-delay='600'>
								<div className='text-center text-lg-start'>
									<a className='btn-get-started d-flex align-items-center justify-content-center align-self-center'>
										<span>Welcome, {user.displayName} </span>
										<i className='bi bi-arrow-right'></i>
									</a>
								</div>
							</div>
							<div data-aos-delay='600'>
								<div className='text-center text-lg-start'>
									<a className='btn-get-started d-flex align-items-center justify-content-center align-self-center'>
										<span> Email: {user.email}</span>
										<i className='bi bi-arrow-right'></i>
									</a>
								</div>
							</div>
						</div>
						<div className='col-lg-6 hero-img' data-aos-delay='200'>
							<img
								src={user.photoURL}
								width='100%'
								className='img-fluid rounded-50'
								alt=''
							/>
						</div>
					</div>
				</div>
			</section>
		</>
	)
}

export default withProtected(Home)
