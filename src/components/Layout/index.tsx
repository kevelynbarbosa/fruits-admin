/* eslint-disable react-hooks/exhaustive-deps */
import React, { ReactNode, useEffect, useState } from 'react'
import { useIdleTimer } from 'react-idle-timer'
import { useSelector } from 'react-redux'

import Navbar from 'components/Navbar'
import Sidebar from 'components/Sidebar'
import { useAuth } from 'contexts/auth'
import { format } from 'date-fns'
import { http } from 'hooks/useHttpInterceptor'
import { getToken, getBootstatus } from 'services/storage'
import { ReduxState } from 'store/types'
import Swal from 'sweetalert2'

interface PropTypes {
  children: ReactNode
}

const Layout: React.FC<PropTypes> = ({ children }: PropTypes) => {

  const leftSidebar = useSelector<ReduxState, boolean>((state) => state.layoutReducer.leftSidebarToggled)

  return (
    <>
      <div className={`${!leftSidebar ? 'toggled ' : ''}d-flex`} id="wrapper">
        <Sidebar />

        <div id="page-content-wrapper">
          <Navbar/>
          <div className="container-fluid content-page">{children}</div>
        </div>
      </div>
    </>
  )
}

export default Layout
