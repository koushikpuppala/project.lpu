import { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

const POST = async (req: NextApiRequest, res: NextApiResponse) => {
	const { phone, uid } = req.body

	const { data } = await axios.post('https://api.koushikpuppala.com/api/verify', {
		phone,
		uid,
	})

	return res.status(200).json(data)
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	req.method === 'POST' && (await POST(req, res))
}

export default handler
