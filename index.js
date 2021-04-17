/* Activate all dependencies and use them */
const app = require('express')()
const server = require('http').createServer(app)
const cors = require('cors')
const io = require('socket.io')(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
})
app.use(cors())

// Port
const PORT = process.env.PORT || 5000

// Create root route
app.get('/', (req, res) => {
  res.send('Server is running')
})

// Socket io
io.on('connection', (socket) => {
  socket.emit('me', socket.id)

  // End call
  socket.on('disconnect', () => {
    socket.broadcast.emit('callended')
  })

  // Start call
  socket.on('calluser', ({ userToCall, signalData, from, name }) => {
    io.to(userToCall).emit('calluser', { signal: signalData, from, name })
  })

  // Answer call
  socket.on('answercall', (data) => {
    io.to(data.to).emit('callaccepted', data.signal)
  })
})

// Create a server listener
server.listen(PORT, () => console.log(`It's alive on port ${PORT}`))
