import React from 'react'

interface Props {
  text?: string
  icon?: string
  color: 'green' | 'red' | 'blue' | 'orange' | 'yellow' | 'gray' | 'transparent'
  handleClick?: () => void
  disabled?: boolean
  type?: 'submit' | 'button'
  hidden?: boolean
}

const Button: React.FC<Props> = ({
  text,
  type = 'button',
  icon,
  color,
  handleClick,
  disabled = false,
  hidden = false,
}: Props) => (
  <button type={type} className={`btn-vix ${color}`} onClick={handleClick} disabled={disabled} hidden={hidden}>
    {icon && <i className={`${icon} btn-icon`} />}
    {text}
  </button>
)

export default Button
