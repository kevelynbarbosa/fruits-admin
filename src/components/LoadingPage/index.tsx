import React from 'react'

const LoadingPage: React.FC = () => (
  <div id="loader-wrapper" className="show">
    <div id="loader" />
    <div className="loader-section section-left" />
    <div className="loader-section section-right" />
  </div>
)

export default LoadingPage
