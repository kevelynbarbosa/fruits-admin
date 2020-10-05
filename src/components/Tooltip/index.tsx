/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/mouse-events-have-key-events */
import React, { useState, useRef } from 'react'
import { Overlay, Tooltip as TooltipBootStrap } from 'react-bootstrap'

export interface TooltipProps {
  icon: string
  message: string
}

const Tooltip: React.FC<TooltipProps> = ({ icon, message }: TooltipProps) => {
  const [show, setShow] = useState(false)
  const target = useRef(null)

  return (
    <>
      <i
        className={icon}
        aria-hidden="true"
        ref={target}
        onMouseOver={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
      />
      <Overlay target={target.current} show={show} placement="right">
        {(props) => (
          <TooltipBootStrap id="button-tooltip" {...props}>
            {message}
          </TooltipBootStrap>
        )}
      </Overlay>
    </>
  )
}

export default Tooltip
