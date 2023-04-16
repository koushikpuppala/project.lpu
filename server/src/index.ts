import express, { Application, Response, Request } from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import cors, { CorsOptions } from 'cors'
import { config } from '@import/config'
import { default as Router } from '@import/router'
import { Database } from './database'

const app: Application = express()
const options: CorsOptions = {
	origin(origin, callback) {
		if (!origin || config.whitelist.indexOf(origin) !== -1) {
			callback(null, true)
		} else {
			callback(new Error('Not allowed by CORS'))
			console.error(`${origin} is not allowed by CORS`)
		}
	},
	credentials: true,
}

Database.init()

app.set('trust proxy', 1)
	.use(bodyParser.urlencoded({ extended: true }))
	.use(bodyParser.json())
	.use(cors(options))
	.use(cookieParser())
	.get('/', (req: Request, res: Response) => {
		const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress
		console.log(req.headers)
		console.log(`IP: ${ip}`)

		res.send('Backend of Project LPU is Working Fine.')
	})
	.use('/api', Router)
	.listen(config.port, config.hostname, () => {
		console.log(`Backend running on: http://localhost:${config.port}`)
	})
