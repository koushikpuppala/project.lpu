import { withProtected } from '../context'
import Layout from '../components/layout'
import Image from 'next/image'
import { Button, Input, InputAdornment, TextField, MenuItem } from '@mui/material'

const Booking = ({ auth }) => {
	const { user } = auth
	const services = [
		{ name: 'Haircut', price: 80 },
		{ name: 'Head Wash', price: 30 },
		{ name: 'Haircut & Head Wash', price: 100 },
		{ name: 'Head Shave', price: 100 },
		{ name: 'Beard Trim or Foaming Shave', price: 50 },
		{ name: 'Head Massage', price: 50 },
		{ name: 'Head Massage with Olive Oil', price: 100 },
		{ name: 'Face Bleach', price: 150 },
		{ name: 'D-TAN Clean up', price: 250 },
		{ name: 'D-TAN Facial', price: 400 },
		{ name: 'Gold / Diamond Facial & Oxy Bleach', price: 600 },
		{ name: 'Whitening Facial', price: 500 },
		{ name: 'Hair Spa', price: 300 },
		{ name: 'Hair Spa With Oil Treatment', price: 400 },
		{ name: 'Hair Colour', price: 350 },
		{ name: 'Hair Colour & Hair Cut', price: 400 },
		{ name: 'Anti Dandruf Treatment For 3 Sitting', price: 1000 },
	]

	const malls = [
		{
			id: 1,
			name: 'BH1',
		},
		{
			id: 2,
			name: 'BH2',
		},
		{
			id: 3,
			name: 'BH3',
		},
		{
			id: 4,
			name: 'BH4',
		},
		{
			id: 5,
			name: 'BH5',
		},
		{
			id: 6,
			name: 'BH6',
		},
		{
			id: 7,
			name: 'UNIMALL',
		},
	]
	return (
		<Layout auth={auth}>
			<div className='container flex min-h-screen items-center justify-center py-16'>
				<div className='box overflow-hidden bg-transparent shadow-2xl sm:rounded-lg'>
					<div className='px-4 py-5 sm:px-6'>
						<h3 className='text-lg font-medium leading-6 text-gray-900'>Booking</h3>
					</div>
					<div className='border-t border-gray-300'>
						<dl>
							<div className='items-center bg-transparent px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
								<dt className='text-sm font-medium text-gray-500'>Profile Pic</dt>
								<dd className='mt-1 flex justify-center text-sm text-gray-900 sm:col-span-2 sm:mt-0 sm:justify-start'>
									<Image
										src={user.photoURL}
										alt='Profile Picture'
										className='rounded-full'
										width={75}
										height={75}
									/>
								</dd>
							</div>
							<div className='bg-transparent px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
								<dt className='text-sm font-medium text-gray-500'>Full name</dt>
								<dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
									{user.displayName}
								</dd>
							</div>
							<div className='bg-transparent px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
								<dt className='text-sm font-medium text-gray-500'>Email address</dt>
								<dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
									{user.email}
								</dd>
							</div>
							<div className='bg-transparent px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
								<dt className='text-sm font-medium text-gray-500'>Phone Number</dt>
								<dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
									+91 {user.phone}
								</dd>
							</div>
							<div className='bg-transparent px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
								<dt className='flex items-center text-sm font-medium text-gray-500'>
									Select Mall
								</dt>
								<dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
									<TextField
										id='outlined-select-currency'
										select
										fullWidth
										label='Select mall'>
										{malls.map(option => (
											<MenuItem
												key={option.id}
												value={option.id}>
												{option.name}
											</MenuItem>
										))}
									</TextField>
								</dd>
							</div>
							<div className='bg-transparent px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
								<dt className='flex items-center text-sm font-medium text-gray-500'>
									Select a service
								</dt>
								<dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
									<TextField
										id='outlined-select-currency'
										select
										fullWidth
										label='Select a service'>
										{services.map(option => (
											<MenuItem
												key={option.price}
												value={option.price}>
												{option.name} - {option.price} /-
											</MenuItem>
										))}
									</TextField>
								</dd>
							</div>
							<div className='flex items-center justify-center bg-transparent px-4 pb-5'>
								<Button
									variant='contained'
									color='info'
									onClick={() => {
										alert('Booking Confirmed but it is not really!')
									}}>
									Book Now
								</Button>
							</div>
						</dl>
					</div>
				</div>
			</div>
		</Layout>
	)
}

export default withProtected(Booking)
