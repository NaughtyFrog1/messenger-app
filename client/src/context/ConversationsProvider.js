import React, { useCallback, useContext, useEffect, useState } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'
import { useContacts } from './ContactsProvider'
import { useSocket } from './SocketProvider'

const ConversationsContext = React.createContext()

export function useConversations() {
  return useContext(ConversationsContext)
}

export function ConversationsProvider({ id, children }) {
  const [conversations, setConversations] = useLocalStorage('conversations', [])
  const [selectedConversationIndex, setSelectedConversationIndex] = useState(0)
  const { contacts } = useContacts()
  const socket = useSocket()

  const addMessageToConversation = useCallback(
    ({ recipients, text, sender }) => {
      setConversations((prev) => {
        let madeChange = false
        const newMessage = { sender, text }

        const newConversastions = prev.map((conversation) => {
          if (arrayEquality(conversation.recipients, recipients)) {
            madeChange = true
            return {
              ...conversation,
              messages: [...conversation.messages, newMessage],
            }
          }
          return conversation
        })

        if (madeChange) return newConversastions
        return [...prev, { recipients, messages: [newMessage] }]
      })
    },
    [setConversations]
  )

  useEffect(() => {
    if (socket == null) return
    socket.on('message:recieve', addMessageToConversation)

    return () => socket.off('message:recieve')
  }, [socket, addMessageToConversation])

  function createConversation(recipients) {
    setConversations((prevConversations) => [
      ...prevConversations,
      { recipients, messages: [] },
    ])
  }

  function sendMessage(recipients, text) {
    socket.emit('message:send', { recipients, text })
    addMessageToConversation({ recipients, text, sender: id })
  }

  const formattedConversations = conversations.map((conversation, index) => {
    const recipients = conversation.recipients.map((recipient) => {
      const contact = contacts.find((contact) => contact.id === recipient)
      const name = (contact && contact.name) || recipient
      return { id: recipient, name }
    })

    const messages = conversation.messages.map((message) => {
      const contact = contacts.find((contact) => contact.id === message.sender)
      const name = (contact && contact.name) || message.sender
      const fromMe = id === message.sender
      return { ...message, senderName: name, fromMe }
    })
    const selected = index === selectedConversationIndex
    return { ...conversation, recipients, messages, selected }
  })

  return (
    <ConversationsContext.Provider
      value={{
        conversations: formattedConversations,
        createConversation,
        sendMessage,
        selectedConversation: formattedConversations[selectedConversationIndex],
        selectConversationIndex: setSelectedConversationIndex,
      }}
    >
      {children}
    </ConversationsContext.Provider>
  )
}

function arrayEquality(a, b) {
  if (a.length !== b.length) return false
  a.sort()
  b.sort()
  return a.every((element, index) => element === b[index])
}
