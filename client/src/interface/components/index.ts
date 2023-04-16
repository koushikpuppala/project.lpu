import { UserDocument } from '@import/interface'
import { SetStateAction } from 'react'

export interface AuthContextProps {
	user: UserDocument | null | undefined
	login: () => Promise<void>
	logout: () => Promise<void>
	setUser: (value: SetStateAction<UserDocument | null | undefined>) => void
}
