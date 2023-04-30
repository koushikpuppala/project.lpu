import Image from 'next/image'
import { PrivateRoute, useAuth } from '@import/components'
import { RootLayout } from '@import/layouts'

const Profile = () => {
	const { user } = useAuth()

	return (
		<PrivateRoute>
			<RootLayout>
				<div className='container flex min-h-screen items-center justify-center'>
					<div className='box overflow-hidden bg-transparent shadow-2xl sm:rounded-lg'>
						<div className='px-4 py-5 sm:px-6'>
							<h3 className='text-lg font-medium leading-6 text-gray-900'>
								Profile Information
							</h3>
						</div>
						<div className='border-t border-gray-300'>
							<dl>
								<div className='items-center bg-transparent px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
									<dt className='text-sm font-medium text-gray-500'>
										Profile Pic
									</dt>
									<dd className='mt-1 flex justify-center text-sm text-gray-900 sm:col-span-2 sm:mt-0 sm:justify-start'>
										<Image
											src={user?.avatar as string}
											alt='Profile Picture'
											className='rounded-full'
											width={75}
											height={75}
											priority={true}
										/>
									</dd>
								</div>
								<div className='bg-transparent px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
									<dt className='text-sm font-medium text-gray-500'>Full name</dt>
									<dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
										{user?.name}
									</dd>
								</div>
								<div className='bg-transparent px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
									<dt className='text-sm font-medium text-gray-500'>
										Email address
									</dt>
									<dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
										{user?.email}
									</dd>
								</div>
								<div className='bg-transparent px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
									<dt className='text-sm font-medium text-gray-500'>
										Phone Number
									</dt>
									<dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
										+91 {user?.phone}
									</dd>
								</div>
							</dl>
						</div>
					</div>
				</div>
			</RootLayout>
		</PrivateRoute>
	)
}

export default Profile
