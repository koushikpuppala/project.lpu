import axios from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'

const GET = async (req: NextApiRequest, res: NextApiResponse) => {
	const { data } = await axios.get(`https://api.koushikpuppala.com/api/user`, {
		headers: {
			'Content-Type': 'application/json',
		},
	})

	return res.status(200).json(data)
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	req.method === 'GET' && (await GET(req, res))
}

export default handler
