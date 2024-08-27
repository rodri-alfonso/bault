import { create } from 'zustand'
import { setExpirationStorage } from '@/lib/storage'

type Store = {
  timestamp: number
  setTimestamp: () => void
  isProtected: boolean
  setIsProtected: (value: boolean) => void
}

export const timestampStore = create<Store>()((set) => ({
  timestamp: 0,
  setTimestamp: () =>
    set(() => {
      const timestamp = new Date().getTime()
      setExpirationStorage(timestamp)

      return { timestamp: timestamp }
    }),
  isProtected: true,
  setIsProtected: (value: boolean) => set({ isProtected: value }),
}))

/* 

1. Pregunta por si el usuario está autenticado. Si no lo está, redirige a la página de inicio de sesión.
2. Si el usuario está autenticado, muestra la pagina SecurityPage.
3. En SecurityPage, el usuario puede introducir un código. Al hacer clic en el botón, verifica si el codigo de Firebase es el mismo que está introduciendo el usuario.
4. Si el código es correcto, se guarda en el almacenamiento local el tiempo de expiracion (3 horas) y se redirige a la página de inicio.
5. Si el código es incorrecto, se muestra un mensaje de error.
*/
