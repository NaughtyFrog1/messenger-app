import React from 'react'
import { ContactsProvider } from '../context/ContactsProvider'
import { ConversationsProvider } from '../context/ConversationsProvider'
import useLocalStorage from '../hooks/useLocalStorage'
import Dashboard from './Dashboard'
import Login from './Login'

export default function App() {
  const [id, setId] = useLocalStorage('id')

  const dashboard = (
    <ContactsProvider>
      <ConversationsProvider>
        <Dashboard id={id} />
      </ConversationsProvider>
    </ContactsProvider>
  )

  return id ? dashboard : <Login onIdSubmit={setId} />
}
