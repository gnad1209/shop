import React from 'react'
import HeaderComponent from '../HeaderComponent/HeaderComponent'

const DefaultComponet = ({children}) => {
  return (
    <div>
      <HeaderComponent />
      {children}
    </div>
  )
}

export default DefaultComponet
