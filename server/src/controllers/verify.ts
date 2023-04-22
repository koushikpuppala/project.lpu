import { Request, Response } from 'express'
import twilio from 'twilio'
import { config } from '@import/config'
import { Users, Verifications } from '@import/database'

const client = twilio(config.twilio.accountSid, config.twilio.authToken)

export const verifyController = async (req: Request, res: Response) => {
	const { phone, uid } = req.body

	try {
		const exist = await Verifications.findOne({
			user: uid,
			phone: phone,
		})

		let randomCode

		if (!exist) {
			randomCode = Math.floor(100000 + Math.random() * 900000)
			const body = `Your Project LPU verification code is: ${randomCode}. This code will expire in 5 minutes. Don't share this code with anyone; our employees will never ask for the code.`
			await client.messages.create({
				body: body,
				from: config.twilio.phoneNumber,
				messagingServiceSid: config.twilio.messagingServiceSid,
				to: `+91${phone}`,
			})
			await Verifications.create({
				user: uid,
				phone: phone,
				token: randomCode,
			})
		} else {
			randomCode = exist.token
		}

		const data = {
			code: randomCode,
			message: 'Verification code sent successfully.',
			success: true,
		}
		res.status(200).json(data)
	} catch (error) {
		console.log(error)
		const data = {
			error: error,
			message: 'Sorry, there was a problem with our service. Please try again later.',
			success: false,
		}
		res.status(500).json(data)
	}
}

export const verifyCodeController = async (req: Request, res: Response) => {
	const { phone, uid, code } = req.body

	try {
		const exist = await Verifications.findOne({
			phone: phone,
		})

		if (!exist) {
			const data = {
				message: 'Verification code not found.',
				success: false,
			}
			res.status(404).json(data)
		} else {
			if (exist.token === code) {
				const data = {
					message: 'Verification code verified successfully.',
					success: true,
				}
				await Verifications.deleteOne({
					phone: phone,
				})
				const updatedUser = await Users.findOneAndUpdate(
					{ uid: uid },
					{ $set: { phone: phone, isVerified: true } },
					{ new: true }
				)
				res.status(200).json({ data, user: updatedUser })
			} else {
				const data = {
					message: 'Verification code is invalid.',
					success: false,
				}
				res.status(400).json(data)
			}
		}
	} catch (error) {
		console.log(error)
		const data = {
			error: error,
			message: 'Sorry, there was a problem with our service. Please try again later.',
			success: false,
		}
		res.status(500).json(data)
	}
}
