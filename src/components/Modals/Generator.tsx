import Modal from '@/theme/Modal'
import { PlusIcon, RepeatIcon, CopyIcon } from '@/assets/icons'
import { generatePassword } from '@/lib/password'
import { useEffect, useState } from 'react'
import Checkbox from '@/theme/Checkbox'
import CircularSlider from '@fseehawer/react-circular-slider'
import { MAX_PASSWORD_LENGTH, MIN_PASSWORD_LENGTH } from '@/lib/config'
import Button from '@/theme/Button'
import Alert from '@/theme/Alert'
import { ALERT_COPY_DEFAULT_MESSAGE } from '@/lib/config'

interface Props {
  isVisible: boolean
  onClose: () => void
  onConfirm?: () => void
}

type ConfigType = 'LOWERCASE' | 'UPPERCASE' | 'SYMBOLS' | 'NUMBERS'

export default function GeneratorModal({ isVisible, onClose }: Props) {
  const [password, setPassword] = useState('')
  const [config, setConfig] = useState<ConfigType[]>(['LOWERCASE', 'NUMBERS', 'SYMBOLS', 'UPPERCASE'])
  const [length, setLength] = useState(MAX_PASSWORD_LENGTH)
  const [alertOpen, setAlertOpen] = useState(false)

  function handleCreatePassword() {
    setPassword(generatePassword(length, config))
  }

  function handleCopyPassword() {
    navigator.clipboard.writeText(password).then(() => setAlertOpen(true))
  }

  function handleChangeConfig(type: ConfigType) {
    if (config.length === 1 && !config.includes('LOWERCASE')) return setConfig(['LOWERCASE'])
    if (config.length === 1 && config.includes('LOWERCASE') && type === 'LOWERCASE') return

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

        <h1 className='text-lg font-semibold text-gray-800 text-center px-10 pb-1'>Generate password</h1>

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
            disabled={config.includes('LOWERCASE') && config.length === 1}
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
            initialValue={15}
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

          <div className='bg-gray-100 rounded-2xl px-3 py-2 flex items-center justify-between gap-2'>
            <p className='font-medium text-lg truncate w-44 text-center ml-auto'>{password}</p>
            <button
              className='p-1.5 rounded-xl bg-gray-800 text-white active:scale-95 transition-all'
              onClick={handleCreatePassword}
            >
              <RepeatIcon />
            </button>
          </div>
        </section>

        <section className='grid gap-2 pt-3'>
          <Button
            onClick={handleCopyPassword}
            label={alertOpen ? 'Copying...' : 'Copy'}
            className='w-full'
            disabled={alertOpen}
          />
          <Button
            onClick={onClose}
            label='Close'
            className='!bg-gray-50 !text-gray-600 font-medium hover:!bg-gray-900 hover:!text-white border border-solid border-gray-300'
          />
        </section>
      </div>
      <Alert
        isVisible={alertOpen}
        onClose={() => setAlertOpen(false)}
        isEphemeral
        message={ALERT_COPY_DEFAULT_MESSAGE}
      />
    </Modal>
  )
}
