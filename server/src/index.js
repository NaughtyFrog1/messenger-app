const io = require('socket.io')(5000, {
  cors: {
    origin: ['http://localhost:3000'],
  },
})

io.on('connect', (socket) => {
  socket.data.id = socket.handshake.query.id
  socket.join(socket.data.id)

  socket.on('message:send', ({ recipients, text }) => {
    recipients.forEach((recipient) => {
      const newRecipients = recipients.filter((r) => r !== recipient)
      newRecipients.push(socket.data.id)

      socket.broadcast.to(recipient).emit('message:recieve', {
        recipients: newRecipients,
        sender: socket.data.id,
        text,
      })
    })
  })
})
