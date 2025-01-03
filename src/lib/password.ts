import { LOWERCASE_LIST, NUMBERS_LIST, SYMBOLS_LIST, UPPERCASE_LIST } from './config'

export type ConfigType = 'LOWERCASE' | 'UPPERCASE' | 'SYMBOLS' | 'NUMBERS'

export const getRandomInt = (max: number) => Math.floor(Math.random() * max)
export const getRandomCharacter = (characters: string) => characters[getRandomInt(characters.length - 1)]

export function generatePassword(length: number, config: Array<ConfigType>) {
  const getCharacterFromList = (listName: ConfigType) => {
    return {
      UPPERCASE: getRandomCharacter(UPPERCASE_LIST),
      LOWERCASE: getRandomCharacter(LOWERCASE_LIST),
      SYMBOLS: getRandomCharacter(SYMBOLS_LIST),
      NUMBERS: getRandomCharacter(NUMBERS_LIST),
    }[listName]
  }

  let password = ''
  for (let i = 0; i < length; i++) {
    const randomListName = config[getRandomInt(config.length)]
    password += getCharacterFromList(randomListName)
  }

  return password
}
