import React from 'react'
import { ContactsProvider } from '../context/ContactsProvider'
import useLocalStorage from '../hooks/useLocalStorage'
import Dashboard from './Dashboard'
import Login from './Login'

export default function App() {
  const [id, setId] = useLocalStorage('id')

  const dashboard = (
    <ContactsProvider>
      <Dashboard id={id} />
    </ContactsProvider>
  )

  return id ? dashboard : <Login onIdSubmit={setId} />
}
