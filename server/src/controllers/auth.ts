import { Request, Response } from 'express'
import { Users } from '@import/database'

export const authController = async (req: Request, res: Response) => {
	const { user, credential } = req.body

	try {
		const userExist = await Users.exists({ uid: user.uid })
		if (!userExist) {
			const User = new Users({
				_id: user.uid,
				name: user.displayName!,
				email: user.email!,
				avatar: user.photoURL!,
				credential: credential.toJSON(),
			})
			await User.save()
			return res.status(201).send({ user: User })
		} else {
			const User = await Users.findByIdAndUpdate(
				user.uid,
				{
					name: user.displayName,
					avatar: user.photoURL,
					credential: credential.toJSON(),
				},
				{ new: true }
			)
			return res.status(200).send({ user: User })
		}
	} catch (error) {
		console.error(error)
		return res.status(500).send({ error: error })
	}
}
