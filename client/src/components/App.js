import React from 'react'
import useLocalStorage from '../hooks/useLocalStorage'
import Login from './Login'

export default function App() {
  const [id, setId] = useLocalStorage('id')

  return (
    <>
      {id}
      <Login onIdSubmit={setId} />
    </>
  )
}
