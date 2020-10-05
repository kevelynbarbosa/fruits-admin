import React from 'react'

import Layout from 'components/Layout'


import AppRoutes from './app.routes'
const MainRoutes: React.FC = () => {
  return (
    <Layout>
      <AppRoutes />
    </Layout>
  )
}

export default MainRoutes
