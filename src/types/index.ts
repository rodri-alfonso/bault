export type Key = {
	value: string
	checked: boolean
}

export interface Register {
	email: string
	user: string
	password: string
	site: string
	keys: Key[]
	color: string
	marked: boolean
	id?: string
}
