/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/mouse-events-have-key-events */
import React, { useEffect, useState, useRef } from 'react'
import { Overlay, Tooltip } from 'react-bootstrap'

import { http } from 'hooks/useHttpInterceptor'
import { HttpResponseType } from 'interfaces/Http'

interface Message {
  titulo: string
  descricao: string
}

interface Props {
  identifier: string
}

const HelperTooltip: React.FC<Props> = ({ identifier }: Props) => {
  const [message, setMessage] = useState<string>()
  const [show, setShow] = useState(false)
  const target = useRef(null)

  useEffect(() => {
    const loadMessage = async () => {
      const request = {
        identificador: identifier,
      }

      const { data } = await http.get<HttpResponseType<Message>>('ajudas-campos/identificacao/', { params: request })

      if (data?.data) setMessage(data.data.descricao)
    }

    loadMessage()
  }, [identifier])

  return (
    <>
      {message && (
        <>
          <i
            className="fa fa-question-circle"
            aria-hidden="true"
            ref={target}
            onMouseOver={() => setShow(true)}
            onMouseLeave={() => setShow(false)}
          />
          <Overlay target={target.current} show={show} placement="right">
            {(props) => (
              <Tooltip id="button-tooltip" {...props}>
                {message}
              </Tooltip>
            )}
          </Overlay>
        </>
      )}
    </>
  )
}

export default HelperTooltip
