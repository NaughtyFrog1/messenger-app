import React from 'react'
import { useConversations } from '../context/ConversationsProvider'
import OpenConversation from './OpenConversation'
import Sidebar from './Sidebar'

export default function Dashboard({ id }) {
  const { selectedConversation } = useConversations()

  return (
    <div className="d-flex vh-100">
      <Sidebar id={id} />
      {selectedConversation && <OpenConversation />}
    </div>
  )
}
