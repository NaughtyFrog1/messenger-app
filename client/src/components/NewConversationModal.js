import React, { useState } from 'react'
import { Modal, Form, Button } from 'react-bootstrap'
import { useContacts } from '../context/ContactsProvider'
import { useConversations } from '../context/ConversationsProvider'

export default function NewConversationModal({ closeModal }) {
  const [selectedContactsIds, setSelectedContactsIds] = useState([])
  const { contacts } = useContacts()
  const { createConversation } = useConversations()

  function handleSubmit(e) {
    e.preventDefault()
    createConversation(selectedContactsIds)
    closeModal()
  }

  function handleCheckboxChange(contactId) {
    setSelectedContactsIds((prev) => {
      if (prev.includes(contactId))
        return prev.filter((prevId) => contactId !== prevId)
      return [...prev, contactId]
    })
  }

  return (
    <>
      <Modal.Header closeButton>Create Conversation</Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          {contacts.map((contact) => (
            <Form.Group className='mb-2' controlId={contact.id} key={contact.id}>
              <Form.Check
                type="checkbox"
                value={selectedContactsIds.includes(contact.id)}
                label={contact.name}
                onChange={() => handleCheckboxChange(contact.id)}
              />
            </Form.Group>
          ))}
          <Button type='submit'>Create</Button>
        </Form>
      </Modal.Body>
    </>
  )
}
