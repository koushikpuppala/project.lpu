import twilio from 'twilio'

export default async function handler(req, res) {
	const accountSid = 'AC47fffb715a5151523c38c02de95df18f'
	const authToken = '5e0080fa8e0a95faf6d47f41f228d132'
	const client = twilio(accountSid, authToken)

	const randomCode = Math.floor(100000 + Math.random() * 900000)

	const { phone } = req.body

	const body = `Your Project LPU verification code is: ${randomCode}. This code will expire in 5 minutes. Don't share this code with anyone; our employees will never ask for the code.`

	const message = await client.messages.create({
		body: body,
		from: '+15854499814',
		messagingServiceSid: 'MG98e52f831be0a27113dff61a4801eea4',
		to: `+91${phone}`,
	})

	message.code = randomCode

	try {
		console.log(message.code)
		return res.status(200).json(message)
	} catch (err) {
		console.error(err)
		res.status(500).json({ message: 'Sorry, there was a problem' })
	}
}
