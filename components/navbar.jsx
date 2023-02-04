import { Fragment, useEffect } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, ChevronDownIcon, XMarkIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { NavbarStyles as styles } from '../styles/components/navbar.module.scss'
import { Logo } from '../src/images'
import Image from 'next/image'
import { NavTool } from '../src/tools'

const Navbar = ({ auth }) => {
	const { user, login, logout } = auth
	const navigation = [
		{ name: 'Home', href: '/' },
		// { name: 'About', href: '/about' },
		{ name: 'Services', href: '/services' },
	]

	const classNames = (...classes) => {
		return classes.filter(Boolean).join(' ')
	}

	useEffect(() => {
		new NavTool()
	})

	return (
		<Disclosure
			as='nav'
			className='animate__animated fixed top-0 z-50 mx-auto w-full transform bg-white md:bg-transparent'>
			{({ open }) => (
				<>
					<div className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8'>
						<div className='relative flex h-16 items-center justify-between'>
							<div className='absolute inset-y-0 left-0 flex items-center sm:hidden'>
								{/* Mobile menu button*/}
								<Disclosure.Button className='inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'>
									<span className='sr-only'>Open main menu</span>
									{open ? (
										<XMarkIcon
											style={{
												color: 'black',
											}}
											className='block h-6 w-6'
											aria-hidden='true'
										/>
									) : (
										<Bars3Icon
											style={{
												color: 'black',
											}}
											className='block h-6 w-6'
											aria-hidden='true'
										/>
									)}
								</Disclosure.Button>
							</div>
							<div className='flex flex-shrink-0 items-center'>
								<Image
									src={Logo}
									alt='Logo'
									className='hidden h-6 w-auto lg:block'
								/>
							</div>
							<div className='flex flex-1 items-center justify-center sm:items-stretch sm:justify-center'>
								<div className='flex flex-shrink-0 items-center'>
									<Image
										src={Logo}
										alt='Logo'
										className='block h-6 w-auto lg:hidden'
									/>
								</div>
								<div className='hidden sm:ml-6 sm:block'>
									<div className='flex space-x-4'>
										{navigation.map(item => (
											<a
												key={item.name}
												href={item.href}
												className='rounded-md px-6 py-2 text-lg font-medium text-gray-900 hover:border-[#4154f1] hover:text-[#4154f1] hover:shadow-lg'
												aria-current={item.current ? 'page' : undefined}>
												{item.name}
											</a>
										))}
									</div>
								</div>
							</div>
							<div className='absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0'>
								{/* Profile dropdown */}
								{user ? (
									<Menu
										as='div'
										className='relative ml-3'>
										<div>
											<Menu.Button className='flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800'>
												<span className='sr-only'>Open user menu</span>
												<Image
													className='h-8 w-8 rounded-full'
													width={75}
													height={75}
													src={user.photoURL}
													alt=''
												/>
											</Menu.Button>
										</div>
										<Transition
											as={Fragment}
											enter='transition ease-out duration-100'
											enterFrom='transform opacity-0 scale-95'
											enterTo='transform opacity-100 scale-100'
											leave='transition ease-in duration-75'
											leaveFrom='transform opacity-100 scale-100'
											leaveTo='transform opacity-0 scale-95'>
											<Menu.Items className='absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
												<Menu.Item>
													{({ active }) => (
														<Link
															href='/profile'
															className={classNames(
																active ? 'bg-gray-100' : '',
																'block px-4 py-2 text-sm text-gray-700'
															)}>
															Your Profile
														</Link>
													)}
												</Menu.Item>
												<Menu.Item>
													{({ active }) => (
														<a
															onClick={logout}
															className={classNames(
																active ? 'bg-gray-100' : '',
																'block px-4 py-2 text-sm text-gray-700'
															)}>
															Log out
														</a>
													)}
												</Menu.Item>
											</Menu.Items>
										</Transition>
									</Menu>
								) : (
									<div className='flex items-center space-x-4'>
										<button
											onClick={login}
											className='rounded-md bg-[#4154f1] py-2 px-6 text-lg font-medium text-white shadow-lg'>
											Login
										</button>
									</div>
								)}
							</div>
						</div>
					</div>

					<Disclosure.Panel className='sm:hidden'>
						<div className='space-y-1 px-2 pt-2 pb-3'>
							{navigation.map(item => (
								<Disclosure.Button
									key={item.name}
									as='a'
									href={item.href}
									// className={classNames(
									// 	item.current
									// 		? 'bg-gray-900 text-white'
									// 		: 'text-gray-300 hover:bg-gray-700 hover:text-white',
									// 	'block rounded-md px-3 py-2 text-base font-medium'
									// )}
									className='block rounded-md px-6 py-2 text-lg font-medium text-gray-900'
									aria-current={item.current ? 'page' : undefined}>
									{item.name}
								</Disclosure.Button>
							))}
						</div>
					</Disclosure.Panel>
				</>
			)}
		</Disclosure>
	)
}

export default Navbar
