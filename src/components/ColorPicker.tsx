import { useState, useRef } from 'react'
import { CARDS_COLORS } from '@/lib/colors'
import { TwitterPicker } from 'react-color'

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
				className='rounded-xl p-3 bg-gray-50 grid place-items-center active:scale-95 transition-all hover:bg-gray-100'
				ref={pickerRef}
			>
				<div className='bg-blue-800 rounded-full w-4 h-4' style={{ backgroundColor: color || color || 'whitesmoke' }} />
			</button>

			{/* {isModalOpen && <BlockPicker ref={pickerRef} />} */}
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
