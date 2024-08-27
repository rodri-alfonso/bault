import CryptoJS from 'crypto-js'
import { ENVIRONMENTS } from './constants'

export const encrypt = (text: string) =>
	CryptoJS.AES.encrypt(text, ENVIRONMENTS.SECRET_ENCRYPTION_KEY, {
		mode: CryptoJS.mode.CFB,
		padding: CryptoJS.pad.AnsiX923,
		format: CryptoJS.format.OpenSSL,
	}).toString()

export const decrypt = (ciphertext: string) => {
	const bytes = CryptoJS.AES.decrypt(ciphertext, ENVIRONMENTS.SECRET_ENCRYPTION_KEY, {
		mode: CryptoJS.mode.CFB,
		padding: CryptoJS.pad.AnsiX923,
		format: CryptoJS.format.OpenSSL,
	})
	return bytes.toString(CryptoJS.enc.Utf8)
}
