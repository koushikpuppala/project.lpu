import { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

const POST = async (req: NextApiRequest, res: NextApiResponse) => {
	const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/payment/verify`, {
		...req.body,
	})

	return res.redirect('/profile?tab=payments&verified=true&paymentId=' + data.payment._id)
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	req.method === 'POST' && (await POST(req, res))
}

export default handler
