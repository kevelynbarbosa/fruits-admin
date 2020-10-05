import React, { ReactNode } from 'react'
import { useHistory } from 'react-router-dom'

import Button from 'components/Button'

interface Props {
  title?: string
  children: ReactNode
  table?: boolean
  formContent?: boolean
  footer?: boolean
  footerAlign?: string

  actionDisabled?: boolean
}

const ContentBox: React.FC<Props> = ({
  title,
  children,
  table,
  footer,
  footerAlign = 'right',
  actionDisabled = false,
}: Props) => {
  const history = useHistory()

  return (
    <div className="content-box">
      {title && <h4>{title}</h4>}

      <div className={`${table ? 'no-padding' : ''} box-body`}>{children}</div>

      {footer && (
        <div className={`box-footer ${footerAlign}`}>
          <Button
            icon="fas fa-ban"
            color="red"
            text="Cancelar"
            handleClick={() => history.goBack()}
            disabled={actionDisabled}
          />
          <Button type="submit" icon="far fa-save" color="green" text="Salvar" disabled={actionDisabled} />
        </div>
      )}
    </div>
  )
}
export default ContentBox
