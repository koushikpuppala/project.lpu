import axios from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'

const GET = async (req: NextApiRequest, res: NextApiResponse) => {
	const { id } = req.query

	const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/user/${id}`)

	return res.status(data.status).json(data)
}

const POST = () => {}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	req.method === 'GET' && (await GET(req, res))
	// req.method === 'POST' && (await POST(req, res))
}

export default handler
