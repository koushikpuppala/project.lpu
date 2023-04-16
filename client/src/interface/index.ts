export * from './config'
export * from './models'
export * from './layouts'
export * from './components'

import Request from 'next'
import { UserDocument } from './models'

export interface UserRequest extends Request {
	user: UserDocument
}

export interface UserComponent {
	user: UserDocument
}
