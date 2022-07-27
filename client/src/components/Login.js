import React, { useRef } from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import {v4 as uuidV4} from 'uuid'

export default function Login({ onIdSubmit }) {
  const idRef = useRef()

  function handleSubmit(e) {
    e.preventDefault()
    onIdSubmit(idRef.current.value)
  }

  function createNewId() {
    onIdSubmit(uuidV4())
  }

  return (
    <Container
      className="d-flex align-items-center vh-100"
    >
      <Form className="w-100" onSubmit={handleSubmit}>
        <Form.Group className="mb-2">
          <Form.Label>Enter your id</Form.Label>
          <Form.Control type="text" ref={idRef} required />
        </Form.Group>
        <Button type="submit" className="me-2">
          Login
        </Button>
        <Button variant="secondary" onClick={createNewId}>Create a new id</Button>
      </Form>
    </Container>
  )
}
