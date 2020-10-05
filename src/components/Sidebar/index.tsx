/* eslint-disable global-require */
import React, { useMemo, useCallback, useState } from 'react'
import { NavLink } from 'react-router-dom'

import { PermissoesMenuResponseType } from 'interfaces/Auth/responses'
import Swal from 'sweetalert2'

const Sidebar: React.FC = () => {
  const listMenu: PermissoesMenuResponseType[] = [
    {
      id: '3',
      descricao: 'Espécies',
      url: '/especies',
      icone: '',
      idModulo: '',
    },
    {
      id: '4',
      descricao: 'Grupos de árvores',
      url: '/grupos',
      icone: '',
      idModulo: '',
    },
     {
      id: '5',
      descricao: 'Árvores',
      url: '/arvores',
      icone: '',
      idModulo: '',
    },
     {
      id: '6',
      descricao: 'Colheita',
      url: '/colheita',
      icone: '',
      idModulo: '',
    },
  ]

  function handleSubmenu(event) {
    event.preventDefault()
    const parent = event.currentTarget.parentNode
    parent.classList.toggle('open')
  }

  const buildTree = (item: PermissoesMenuResponseType) => {
    const children = listMenu.filter((child) => child.idModulo === item.id)

    if (children.length > 0) {
      const subMenu = (
        <ul>{children.map(buildTree).map((listItem) => listItem)}</ul>
      )

      return (
        <li className="submenu" key={item.id}>
          <NavLink
            activeClassName="active"
            to={item.url}
            onClick={handleSubmenu}
          >
            {item.icone && <i className={item.icone} />}
            <span>{item.descricao}</span>
          </NavLink>

          {subMenu}
        </li>
      )
    }
    return (
      <li key={item.id}>
        <NavLink exact activeClassName="active" to={item.url}>
          {item.icone && <i className={item.icone} />}
          <span>{item.descricao}</span>
        </NavLink>
      </li>
    )
  }

  const firstLevel = listMenu?.filter((itemMenu) => !itemMenu.idModulo)
  const categories = firstLevel?.map(buildTree)

  const finalMenu = (
    <ul>
      <li className="title">NAVEGAÇÃO</li>
      {categories?.map((li) => li)}
    </ul>
  )

  return (
    <div className="bg-light" id="sidebar-wrapper">
      <div className="bar-colors">
        <div className="green" />
        <div className="red" />
        <div className="orange" />
        <div className="blue" />
      </div>
      <div className="sidebar-heading"></div>
      {finalMenu}
    </div>
  )
}

export default Sidebar
