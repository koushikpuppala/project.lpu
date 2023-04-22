import { RootLayout } from '@import/layouts'
import Image from 'next/image'
import { Button, TextField, MenuItem } from '@mui/material'
import { PrivateRoute, useAuth } from '@import/components'
import axios from 'axios'
import { services, blocks } from '@import/constant'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'

const BookingPage = () => {
	const { user } = useAuth()
	const [amount, setAmount] = useState(0)
	const router = useRouter()

	const handlePayment = async () => {
		const {
			data: { order, key },
		} = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/payment/checkout`, {
			amount: amount,
			user,
		})
		console.log(order, key)

		var options = {
			key: key,
			amount: order.amount,
			currency: 'INR',
			name: 'PROJECT LPU',
			description: 'Test Transaction',
			image: '/favicon.ico',
			order_id: order.id,
			handler: function (response: any) {
				axios
					.post(`${process.env.NEXT_PUBLIC_API_URL}/payment/verify`, {
						razorpay_payment_id: response.razorpay_payment_id,
						razorpay_order_id: response.razorpay_order_id,
						razorpay_signature: response.razorpay_signature,
						order,
						user,
					})
					.then(res => {
						console.log(res)
					})
				router.push(`/profile`)
				toast.success('Payment Successful')
			},
			prefill: {
				name: user?.name, //your customer's name
				email: user?.name,
				contact: user?.phone,
			},
			notes: {
				address: 'LPU',
			},
			theme: {
				color: '#3399cc',
			},
		}

		var rzp1 = new (window as any).Razorpay(options)

		rzp1.on('payment.failed', function (response: any) {
			toast.error('Payment Failed' + response.error.code)
		})

		rzp1.open()
	}

	return (
		<PrivateRoute>
			<RootLayout>
				<div className='container flex min-h-screen items-center justify-center py-16'>
					<div className='box overflow-hidden bg-transparent shadow-2xl sm:rounded-lg'>
						<div className='px-4 py-5 sm:px-6'>
							<h3 className='text-lg font-medium leading-6 text-gray-900'>Booking</h3>
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
											{blocks.map(option => (
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
											label='Select a service'
											onChange={e => {
												console.log(e.target.value)
												setAmount(Number(e.target.value))
											}}>
											{services.map(option => (
												<MenuItem
													key={option.price}
													value={option.price}
													onChange={() => console.log('changed')}>
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
											handlePayment()
											// alert('Booking Confirmed but it is not really!')
										}}>
										Book Now
									</Button>
								</div>
							</dl>
						</div>
					</div>
				</div>
			</RootLayout>
		</PrivateRoute>
	)
}

export default BookingPage
