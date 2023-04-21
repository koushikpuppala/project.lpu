import { NextFunction, Response } from 'express'
import jwt from 'jsonwebtoken'
import { config } from '@import/config'
import { Users } from '@import/database'
import { UserRequest } from '@import/interface'

export const Authentication = async (req: UserRequest, res: Response, next: NextFunction) => {
	const token = req.headers.authorization?.split(' ')[1]
	if (token) {
		try {
			const decoded = jwt.verify(token, config.razorpay.key_secret)
			const user = await Users.findById(decoded)
			if (user) {
				req.user = user
				next()
			} else {
				res.status(401).json({ message: 'Unauthorized' })
			}
		} catch (error) {
			res.status(401).json({ message: 'Unauthorized' })
		}
	} else {
		res.status(401).json({ message: 'Unauthorized' })
	}
}
