import { withPublic } from '../context'
import Layout from '../components/layout'
import { Mall } from '../src/images'
import Image from 'next/image'
import { Button } from '@mui/material'
import { useRouter } from 'next/router'

const Services = ({ auth }) => {
	const router = useRouter()

	const handleClickOpen = () => {
		router.push('/booking')
	}

	const products = [
		{
			id: 1,
			name: 'BH1',
			imageSrc: Mall,
		},
		{
			id: 2,
			name: 'BH2',
			imageSrc: Mall,
		},
		{
			id: 3,
			name: 'BH3',
			imageSrc: Mall,
		},
		{
			id: 4,
			name: 'BH4',
			imageSrc: Mall,
		},
		{
			id: 5,
			name: 'BH5',
			imageSrc: Mall,
		},
		{
			id: 6,
			name: 'BH6',
			imageSrc: Mall,
		},
		{
			id: 7,
			name: 'UNIMALL',
			imageSrc: Mall,
		},
	]
	return (
		<Layout auth={auth}>
			<div className='container flex items-center justify-center'>
				<div className='mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8'>
					<div className='mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8'>
						{products.map(product => (
							<div
								key={product.id}
								className='box group relative p-3'>
								<div className='mb-4 flex items-center justify-center align-middle'>
									<h3 className='text-2xl text-gray-700'>{product.name}</h3>
								</div>
								<div className='min-h-80 aspect-w-1 aspect-h-1 lg:aspect-none w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:h-80'>
									<Image
										src={product.imageSrc}
										alt={product.name}
										className='h-full w-full object-cover object-center lg:h-full lg:w-full'
									/>
								</div>
								<div className='mt-4 flex items-center justify-center align-middle'>
									<Button
										variant='contained'
										onClick={handleClickOpen}
										color='primary'>
										Book an appointment
									</Button>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</Layout>
	)
}

export default withPublic(Services)
