export * from './config'
export * from './models'

import { Request } from 'express'
import { UserDocument } from './models'

export interface UserRequest extends Request {
	user: UserDocument
}
