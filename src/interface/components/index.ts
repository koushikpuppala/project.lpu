import { UserDocument } from '@import/interface'
import { SetStateAction } from 'react'

export interface AuthContextProps {
	user: UserDocument | null | undefined
	login: () => Promise<boolean | undefined>
	logout: () => Promise<boolean | undefined>
	setUser: (value: SetStateAction<UserDocument | null | undefined>) => void
}
