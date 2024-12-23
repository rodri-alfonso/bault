import { useState } from 'react'
import './Tooltip.css'

interface Props {
  children: React.ReactNode
  content: React.ReactNode
  direction?: 'top' | 'right' | 'bottom' | 'left'
  delay?: number
  disabled?: boolean
}

const Tooltip = ({ children, content, delay = 250, direction = 'top', disabled }: Props) => {
  let timeout: NodeJS.Timeout
  const [active, setActive] = useState(false)

  const showTip = () => {
    if (disabled) return
    timeout = setTimeout(() => {
      setActive(true)
    }, delay || 400)
  }

  const hideTip = () => {
    clearInterval(timeout)
    setActive(false)
  }

  return (
    <div className='Tooltip-Wrapper' onMouseEnter={showTip} onMouseLeave={hideTip}>
      {children}
      {active && <div className={`Tooltip-Tip ${direction} text-xs font-medium`}>{content}</div>}
    </div>
  )
}

export default Tooltip
