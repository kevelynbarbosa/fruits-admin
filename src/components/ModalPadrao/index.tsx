import React, { useState, useEffect, ReactNode, useCallback } from 'react'
import { Button, Modal } from 'react-bootstrap'

interface PropTypes {
  title: string
  children: ReactNode
  showButton?: boolean
  buttonText?: string
  open?: boolean
  closeButtonText?: string
  modalSize: 'sm' | 'lg' | 'xl'
  hideFooter?: boolean
  actionButtonText?: string
  hideActionButton?: boolean
  typeActionButton?: 'button' | 'submit'
  hideAction?: (e: boolean) => void
  submitAction?: (e: boolean) => void
}

const ModalPadrao: React.FC<PropTypes> = ({
  title,
  children,
  showButton,
  buttonText,
  open,
  closeButtonText,
  modalSize,
  hideFooter,
  actionButtonText = 'Continuar',
  hideActionButton,
  typeActionButton = 'button',
  hideAction,
  submitAction,
}) => {
  const [show, setShow] = useState(open)

  useEffect(() => {
    setShow(open)
  }, [open])

  const handleClose = () => {
    if (hideAction) {
      hideAction(!open)
    }
    return setShow(false)
  }
  const handleShow = () => setShow(true)

  const onActionClick = useCallback(() => {
    if (submitAction) submitAction(true)
  }, [])

  return (
    <>
      {showButton && (
        <Button variant="primary" onClick={handleShow}>
          {buttonText}
        </Button>
      )}

      <Modal show={show} onHide={handleClose} size={modalSize} centered>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{children}</Modal.Body>
        {hideFooter ?? (
          <Modal.Footer>
            <button type="button" className="btn-vix transparent" onClick={handleClose}>
              {closeButtonText ?? 'Fechar'}
            </button>

            {!hideActionButton && (
              <button type={typeActionButton} className="btn-vix gray" onClick={onActionClick}>
                {actionButtonText ?? 'Continuar'}
              </button>
            )}
          </Modal.Footer>
        )}
      </Modal>
    </>
  )
}

export default ModalPadrao
