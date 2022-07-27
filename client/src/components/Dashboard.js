import React from 'react'
import Sidebar from './Sidebar'

export default function Dashboard({ id }) {
  return (
    <div className='d-flex vh-100'>
      <Sidebar id={id} />
    </div>
  )
}
