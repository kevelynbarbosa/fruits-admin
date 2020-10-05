import React, { useState, useCallback, useEffect } from 'react'
import { Dropdown, DropdownButton } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { useAuth } from 'contexts/auth'
import { getUser } from 'services/storage'
import { toggleLeftSidebar } from 'store/reducers/layout/actions'

type PropTypes = {
  timeToExpire?: string
}

const Navbar: React.FC<PropTypes> = ({ timeToExpire }: PropTypes) => {
  const history = useHistory()
  const dispatch = useDispatch()
  const [leftIsOpen, setLeftIsOpen] = useState(true)
  const user = getUser()
  const { signOut } = useAuth()
  const [foto, setFoto] = useState<string>()

  const loadFoto = useCallback(() => {
    if (user?.foto) {
      const base64String = `data:image/jpeg;charset=utf-8;base64, ${user.foto}`
      setFoto(base64String)
    }
  }, [user])
  useEffect(() => {
    loadFoto()
  }, [loadFoto])

  function sidebarToggle() {
    setLeftIsOpen(!leftIsOpen)
    dispatch(toggleLeftSidebar(!leftIsOpen))
  }

  function handleSignOut() {
    signOut()
  }

  const handleToProfile = () => {
    history.push('/perfil')
  }

  const avatar = foto ? (
    <img className="img-avatar shadow" src={foto} alt={user?.nome} />
  ) : (
    <span className="txt-avatar shadow">{user?.nome?.substr(0, 1)}</span>
  )

  const mountUserInfo = useCallback(
    () => (
      <div className="info-box">
        <div className="info-image">{avatar}</div>
        <div>
          <p className="info-name">{user?.nome}</p>
          <p className="info-email">{user?.email}</p>
          <p className="info-enterprise">{user?.empresa}</p>
          <p className="info-centrocusto">{user?.centroCusto}</p>
        </div>
      </div>
    ),
    [avatar, user],
  )

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-vix">
        <button type="button" className="btn btn-green" id="menu-toggle" onClick={sidebarToggle}>
          <i className="fas fa-bars" />
        </button>

        <button
          type="button"
          className="navbar-toggler"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

      </nav>
    </>
  )
}

export default Navbar
