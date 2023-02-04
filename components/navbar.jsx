import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, ChevronDownIcon, XMarkIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { NavbarStyles as styles } from '../styles/components/navbar.module.scss'
import { Logo } from '../src/images'
import Image from 'next/image'

const Navbar = ({ auth }) => {
	const { user, login, logout } = auth
	const publicNav = [
		{ name: 'Home', href: '/' },
		{ name: 'About', href: '/about' },
		{ name: 'Services', href: '/services' },
	]

	const privateNav = [
		{ name: 'Profile', href: '/profile' },
		{ name: 'Logout', href: '#', button: true, onClick: logout },
	]

	const classNames = (...classes) => {
		return classes.filter(Boolean).join(' ')
	}

	return (
		<Disclosure
			as='nav'
			className='animate__animated fixed top-0 z-50 mx-auto w-full transform bg-white md:bg-transparent'>
			{({ open }) => (
				<>
					<div className='mx-auto max-w-7xl px-2 md:px-6 lg:px-8'>
						<div className='relative grid h-20 grid-cols-2 items-center justify-between align-middle md:flex md:h-24'>
							<div className='flex flex-1 items-center justify-start md:items-stretch md:justify-between'>
								<div className='flex flex-shrink-0 items-center'>
									<Image
										src={Logo}
										alt='Logo'
										className='mr-1.5 flex h-6 w-auto'
									/>
									<span className='mt-1 font-[Nunito] text-3xl font-bold tracking-widest text-[#012970]'>
										FlexStart
									</span>
								</div>
								<div className='hidden md:ml-6 md:block md:py-2'>
									<div className='flex items-center space-x-4'>
										{user ? (
											<>
												{privateNav.map(item => {
													return item.button ? (
														<button
															key={item.name}
															onClick={item.onClick}
															className={classNames(
																'rounded-md bg-[#4154f1] px-6 py-2 text-lg font-medium text-white hover:bg-[#5969f3] hover:shadow-lg'
															)}>
															{item.name}
														</button>
													) : (
														<Link
															key={item.name}
															href={item.href}
															className={classNames(
																'rounded-md border-2 px-6 py-2 text-lg font-medium text-black hover:border-[#4154f1] hover:text-[#4154f1] hover:shadow-lg'
															)}>
															{item?.icon}
															{item.name}
														</Link>
													)
												})}
											</>
										) : (
											<>
												{publicNav.map(item => {
													return (
														<Link
															key={item.name}
															href={item.href}
															className={classNames(
																'rounded-md px-3 py-2 text-lg font-medium text-black hover:bg-blue-400 hover:text-white'
															)}>
															{item.name}
														</Link>
													)
												})}
											</>
										)}
									</div>
								</div>
							</div>
							<div className='flex items-center justify-end md:hidden md:items-stretch md:justify-between'>
								{/* Mobile menu button*/}
								<Disclosure.Button className='inline-flex items-center justify-center rounded-md p-2 text-gray-400'>
									<span className='sr-only'>Open main menu</span>
									{open ? (
										<XMarkIcon
											className='block h-10 w-auto'
											aria-hidden='true'
										/>
									) : (
										<Bars3Icon
											className='block h-10 w-auto'
											aria-hidden='true'
										/>
									)}
								</Disclosure.Button>
							</div>
						</div>
					</div>

					<Disclosure.Panel className='items-center space-y-1 bg-black px-2 pt-2 pb-3 md:hidden'>
						{({ close }) => (
							<>
								{user ? (
									<>
										{privateNav.map(item => {
											return item.button ? (
												<button
													key={item.name}
													onClick={item.onClick}
													className={classNames(
														'rounded-md bg-[#4154f1] px-6 py-2 text-lg font-medium text-white hover:bg-[#5969f3] hover:shadow-lg'
													)}>
													{item.name}
												</button>
											) : (
												<Disclosure.Button
													key={item.name}
													as={Link}
													href={item.href}
													onClick={close}
													className={classNames(
														'text-black hover:bg-blue-400 hover:text-white',
														'flex items-center rounded-md px-3 py-2 text-base font-medium'
													)}>
													{item.name}
												</Disclosure.Button>
											)
										})}
									</>
								) : (
									<>
										{publicNav.map(item => {
											return (
												<Disclosure.Button
													key={item.name}
													as={Link}
													href={item.href}
													onClick={close}
													className={classNames(
														'text-black hover:bg-blue-400 hover:text-white',
														'flex items-center rounded-md px-3 py-2 text-base font-medium'
													)}>
													{item.name}
												</Disclosure.Button>
											)
										})}
									</>
								)}
							</>
						)}
					</Disclosure.Panel>
				</>
			)}
		</Disclosure>
	)
}

export default Navbar
