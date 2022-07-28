import React, { useState, useEffect, useCallback } from 'react'
import { Button, Form, InputGroup } from 'react-bootstrap'
import { useConversations } from '../context/ConversationsProvider'

export default function OpenConversation() {
  const [text, setText] = useState('')
  const setRef = useCallback((node) => {
    node && node.scrollIntoView({ smooth: true })
  }, [])
  const { sendMessage, selectedConversation } = useConversations()

  function handleSubmit(e) {
    e.preventDefault()
    sendMessage(
      selectedConversation.recipients.map((r) => r.id),
      text
    )
    setText('')
  }

  return (
    <div className="d-flex flex-column flex-grow-1">
      <div className="flex-grow-1 overflow-auto">
        <div className="d-flex flex-column align-items-start justify-content-end px-3">
          {selectedConversation.messages.map((message, index) => (
            <div
              ref={
                selectedConversation.messages.length - 1 === index
                  ? setRef
                  : null
              }
              key={index}
              className={`my-1 d-flex flex-column ${
                message.fromMe ? 'align-self-end' : ''
              }`}
            >
              <div
                className={`rounded px-2 py-1 ${
                  message.fromMe ? 'bg-primary text-white' : 'border'
                }`}
              >
                {message.text}
              </div>
              <div
                className={`text-muted small ${
                  message.fromMe ? 'text-end' : ''
                }`}
              >
                {message.fromMe ? 'You' : message.sender.name}
              </div>
            </div>
          ))}
        </div>
      </div>
      <Form className="m-2" onSubmit={handleSubmit}>
        <Form.Group>
          <InputGroup>
            <Form.Control
              as="textarea"
              required
              value={text}
              onChange={(e) => setText(e.target.value)}
              style={{ height: '75px', resize: 'none' }}
            />
            <Button type="submit">Send</Button>
          </InputGroup>
        </Form.Group>
      </Form>
    </div>
  )
}
