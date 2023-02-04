import Link from 'next/link'

const Header = ({ auth }) => {
	const { user, login, logout } = auth
	return (
		<header
			id='header'
			className='header fixed-top'>
			<div className='container-fluid container-xl d-flex align-items-center justify-content-between'>
				<a
					href='/'
					className='logo d-flex align-items-center'>
					<img
						src='/assets/img/logo.png'
						alt=''
					/>
					<span>FlexStart</span>
				</a>

				<nav
					id='navbar'
					className='navbar'>
					<ul>
						{user && (
							<li>
								<Link
									className='nav-link'
									href='/profile'>
									Profile
								</Link>
							</li>
						)}
						<li>
							<a
								className='getstarted'
								onClick={user ? logout : login}
								style={{
									cursor: 'pointer',
								}}>
								{user ? 'Logout' : 'Login'}
							</a>
						</li>
					</ul>
					<i className='bi bi-list mobile-nav-toggle'></i>
				</nav>
			</div>
		</header>
	)
}

export default Header
