import { useState, useRef } from 'react'
import { CARDS_COLORS } from '@/lib/colors'
import { TwitterPicker } from 'react-color'
import { PaintBucketIcon } from '@/assets/icons'

interface Props {
  color: string
  setColor: (color: string) => void
}

export default function ColorPicker({ color, setColor }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const pickerRef = useRef(null)

  function onChangeColor(color: any) {
    setColor(color.hex)
    setIsModalOpen(false)
  }

  return (
    <div className='flex flex-col justify-end items-end gap-2'>
      <button
        onClick={() => setIsModalOpen(!isModalOpen)}
        className='grid place-items-center p-2 bg-gray-50 hover:bg-gray-100 text-gray-800 rounded-xl active:scale-95 transition-all'
        ref={pickerRef}
        style={{
          backgroundColor: color + '4D',
        }}
      >
        {/* <div className='bg-blue-800 rounded-full w-4 h-4' style={{ backgroundColor: color || color || 'whitesmoke' }} /> */}
        <PaintBucketIcon />
      </button>

      {isModalOpen && (
        <TwitterPicker
          triangle='hide'
          styles={{
            default: {
              body: {},
              card: {
                width: 204,
              },
            },
          }}
          onChange={onChangeColor}
          color={color}
          colors={CARDS_COLORS}
        />
      )}
    </div>
  )
}
