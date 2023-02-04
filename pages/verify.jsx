import { withVerified } from '../context'
import Layout from '../components/layout'
import Image from 'next/image'
import { Button, Input, InputAdornment, TextField } from '@mui/material'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'

const Verify = ({ auth }) => {
	const { user, setUser } = auth
	const [sendOTP, setSendOTP] = useState(false)
	const [phone, setPhone] = useState('')
	const [otp, setOTP] = useState('')
	const [code, setCode] = useState('')

	const router = useRouter()
	useEffect(() => {
		console.log(isNaN(phone))
	}, [user])
	return (
		<Layout auth={auth}>
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
							<div className='items-center bg-transparent px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
								<dt className='text-sm font-medium text-gray-500'>Full name</dt>
								<dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
									{user.displayName}
								</dd>
							</div>
							<div className='items-center bg-transparent px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
								<dt className='text-sm font-medium text-gray-500'>Email address</dt>
								<dd
									className='mt-1 overflow-scroll text-sm text-gray-900 sm:col-span-2 sm:mt-0 sm:overflow-visible'
									style={{
										scrollbarColor: 'transparent transparent',
										scrollbarWidth: '0px',
									}}>
									{user.email}
								</dd>
							</div>
							<div className='items-center bg-transparent px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
								<dt className='text-sm font-medium text-gray-500'>Phone Number</dt>
								<dd className='mt-1 overflow-scroll text-sm text-gray-900 sm:col-span-2 sm:mt-0 sm:overflow-visible'>
									{!sendOTP ? (
										<TextField
											label='Enter Phone Number'
											sx={{ m: 1 }}
											onChange={e => {
												console.log(e.target.value)
												if (
													e.target.value.length > 10 ||
													isNaN(e.target.value)
												)
													return
												setPhone(e.target.value)
											}}
											value={phone}
											readOnly={sendOTP}
											InputProps={{
												startAdornment: (
													<InputAdornment position='start'>
														+91
													</InputAdornment>
												),
											}}
										/>
									) : (
										'+91 ' + phone
									)}
								</dd>
							</div>
							{!sendOTP ? (
								<div className='flex items-center justify-center bg-transparent px-4 pb-5'>
									<Button
										variant='contained'
										color='info'
										disabled={phone.length !== 10 || isNaN(phone)}
										onClick={() => {
											setSendOTP(true)
											axios
												.post('/api/verify', { phone: phone })
												.then(res => {
													console.log(res.data)
													setCode(res.data.code)
												})
												.catch(err => {
													console.log(err)
												})
										}}>
										Send OTP
									</Button>
								</div>
							) : (
								<>
									<div className='items-center bg-transparent px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
										<dt className='items-center text-sm font-medium text-gray-500'>
											Enter OTP
										</dt>
										<dd className='mt-1 space-y-4 text-sm text-gray-900 sm:col-span-2 sm:mt-0 sm:space-x-4'>
											<TextField
												label='Enter OTP'
												sx={{ m: 1 }}
												onChange={e => {
													if (
														e.target.value.length > 6 ||
														isNaN(e.target.value)
													)
														return
													setOTP(e.target.value)
												}}
												value={otp}
											/>
										</dd>
									</div>
									<div className='flex items-center justify-center space-x-4 bg-transparent px-4 pb-5'>
										<Button
											variant='contained'
											color='success'
											disabled={otp.length !== 6 || isNaN(phone)}
											onClick={() => {
												console.log(code)
												if (Number(otp) === Number(code)) {
													user.phone = phone
													setUser(user)
													localStorage.setItem('number', phone)
													localStorage.setItem('isVerified', true)
													router.push('/profile', '/profile', {
														shallow: true,
													})
													return
												} else {
													alert('Invalid OTP')
												}
											}}>
											Verify OTP
										</Button>
										<Button
											variant='contained'
											color='info'
											onClick={() => {
												setSendOTP(false)
											}}>
											Edit Number
										</Button>
									</div>
								</>
							)}
						</dl>
					</div>
				</div>
			</div>
		</Layout>
	)
}

export default withVerified(Verify)
