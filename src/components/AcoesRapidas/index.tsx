import React, { useCallback } from 'react'
import { Dropdown } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'

type PropTypes = {
  type?:
    | 'success'
    | 'primary'
    | 'secondary'
    | 'danger'
    | 'warning'
    | 'info'
    | 'dark'
    | 'light'
    | 'outline-primary'
    | 'outline-secondary'
    | 'outline-success'
    | 'outline-danger'
  links: {
    id: string
    title: string
    url?: string
    disabledLink?: boolean
    event?: (id: string) => Promise<void> | void
    isEvent: boolean
    hidden?: boolean
  }[]
  disabledRow?: boolean
}

const AcoesRapidas: React.FC<PropTypes> = ({ type, links, disabledRow }) => {
  const history = useHistory()

  const onClick = useCallback((link) => {
    if (link.isEvent) link.event(link.id)
    else history.push(`${link.url}`)
  }, [])

  return (
    <Dropdown>
      <Dropdown.Toggle variant={type ?? 'light'} className="btn-acoes-rapidas" id="list-quick-actions">
        <i className="fas fa-ellipsis-v" />
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {links.map(
          (link) =>
            link.disabledLink &&
            !link.hidden && (
              <Dropdown.Item
                key={`${link.id}-${link.title}`}
                onClick={() => {
                  onClick(link)
                }}
              >
                {link.title}
              </Dropdown.Item>
            ),
        )}

        {disabledRow && (
          <>
            <Dropdown.Divider />
            <Dropdown.Header>Alterações neste registro estão desabilitadas pois ele está desabilitado.</Dropdown.Header>
          </>
        )}
      </Dropdown.Menu>
    </Dropdown>
  )
}

export default AcoesRapidas
