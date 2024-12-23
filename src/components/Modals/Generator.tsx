import Modal from '@/theme/Modal'
import { PlusIcon, RepeatIcon, CopyIcon } from '@/assets/icons'
import { generatePassword } from '@/lib/password'
import { useEffect, useState } from 'react'
import Checkbox from '@/theme/Checkbox'
import CircularSlider from '@fseehawer/react-circular-slider'
import { MAX_PASSWORD_LENGTH, MIN_PASSWORD_LENGTH } from '@/lib/config'
import IconButton from '@/theme/IconButton'

interface Props {
  isVisible: boolean
  onClose: () => void
  onConfirm?: () => void
}

type ConfigType = 'LOWERCASE' | 'UPPERCASE' | 'SYMBOLS' | 'NUMBERS'

export default function GeneratorModal({ isVisible, onClose, onConfirm }: Props) {
  const [password, setPassword] = useState('')
  const [config, setConfig] = useState<ConfigType[]>(['LOWERCASE', 'NUMBERS', 'SYMBOLS', 'UPPERCASE'])
  const [length, setLength] = useState(MAX_PASSWORD_LENGTH)

  function handleCreatePassword() {
    setPassword(generatePassword(length, config))
  }

  function handleCopyPassword() {
    navigator.clipboard.writeText(password).then(() => {
      alert('Password copied to clipboard')
    })
  }

  function handleChangeConfig(type: ConfigType) {
    if (config.includes(type)) {
      setConfig(config.filter((item) => item !== type))
    } else {
      setConfig([...config, type])
    }
  }

  useEffect(() => {
    handleCreatePassword()
  }, [length, config])

  return (
    <Modal isVisible={isVisible}>
      <div className='flex flex-col gap-4 rounded-2xl bg-white p-6 m-4 relative'>
        <button
          onClick={onClose}
          className='absolute top-3 right-3 hover:bg-gray-100 p-1 rounded-md text-gray-500 bg-gray-50 active:scale-95 transition-all'
        >
          <PlusIcon className='rotate-45' />
        </button>

        <h1 className='text-lg font-semibold text-gray-800 text-center px-10'>Generate password</h1>

        <section className='grid grid-cols-2 gap-2 place-items-center'>
          <Checkbox
            checked={config.includes('NUMBERS')}
            label='Numbers'
            onChange={() => handleChangeConfig('NUMBERS')}
            type='NUMBERS'
          />
          <Checkbox
            checked={config.includes('SYMBOLS')}
            label='Symbols'
            onChange={() => handleChangeConfig('SYMBOLS')}
            type='SYMBOLS'
          />
          <Checkbox
            checked={config.includes('UPPERCASE')}
            label='Caps'
            onChange={() => handleChangeConfig('UPPERCASE')}
            type='UPPERCASE'
          />
          <Checkbox
            checked={config.includes('LOWERCASE')}
            label='Lowers'
            onChange={() => handleChangeConfig('LOWERCASE')}
            type='LOWERCASE'
          />
        </section>

        <section className='w-full grid gap-2 place-items-center py-2'>
          <CircularSlider
            label='Characters'
            labelFontSize='14px'
            labelColor='#1F2937'
            knobColor='#1F2937'
            labelBottom
            knobSize={30}
            progressSize={6}
            valueFontSize='40px'
            progressColorFrom='#222a35'
            progressColorTo='#1F2937'
            trackColor='#eeeeee'
            trackSize={11}
            progressLineCap='flat'
            width={160}
            min={MIN_PASSWORD_LENGTH}
            max={MAX_PASSWORD_LENGTH}
            direction={1}
            onChange={(value: number) => setLength(value)}
          >
            <div />
          </CircularSlider>
        </section>

        <section className='grid gap-1'>
          <span className='text-xs text-center text-gray-500'>Password generated</span>

          <div className='bg-gray-100 rounded-2xl px-3 py-2 grid place-items-center'>
            <p className='font-medium text-lg truncate w-44 text-center'>{password}</p>
          </div>
        </section>

        <section className='flex items-center gap-2.5 justify-center pt-3'>
          <button
            className='bg-gray-100 text-gray-600 active:scale-95 transition-all p-2 rounded-full border-solid border border-gray-400 font-medium'
            onClick={onClose}
          >
            <PlusIcon className='rotate-45 w-6 h-6' />
          </button>
          <button
            className='p-2.5 rounded-full bg-gray-800 text-white active:scale-95 transition-all ring-2 ring-opacity-50 border-solid border-2 border-white ring-black'
            onClick={handleCreatePassword}
          >
            <RepeatIcon className='w-7 h-7' />
          </button>
          <button
            className='bg-gray-100 text-gray-600 active:scale-95 transition-all p-2 rounded-full border-solid border border-gray-400 font-medium'
            onClick={handleCopyPassword}
          >
            <CopyIcon className='w-6 h-6' />
            {/* Copy */}
          </button>
        </section>
      </div>
    </Modal>
  )
}
