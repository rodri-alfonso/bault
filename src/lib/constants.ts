export const ENVIRONMENTS = {
	SECRET_ENCRYPTION_KEY: import.meta.env.VITE_SECRET_ENCRYPTION_KEY || '',

	FIREBASE_API_KEY: import.meta.env.VITE_FIREBASE_API_KEY || '',
	FIREBASE_AUTH_DOMAIN: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || '',
	FIREBASE_PROJECT_ID: import.meta.env.VITE_FIREBASE_PROJECT_ID || '',
	FIREBASE_STORAGE_BUCKET: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || '',
	FIREBASE_MESSAGING_SENDER_ID: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '',
	FIREBASE_APP_ID: import.meta.env.VITE_FIREBASE_APP_ID || '',

	LOCAL_STORAGE_KEY: import.meta.env.VITE_LOCAL_STORAGE_KEY || '',
}
