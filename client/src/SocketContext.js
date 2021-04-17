import React, { createContext, useState, useRef, useEffect } from 'react'
import { io } from 'socket.io-client'
import Peer from 'simple-peer'

// Create Context
const SocketContext = createContext()

// Create instance of socket.io
/* 
    # NOTE!: Change url in production
*/
const socket = io('http://localhost:5000')

// Context Component
const ContextProvider = ({ children }) => {
  const [stream, setStream] = useState(null)
  const [me, setMe] = useState('')
  const [call, setCall] = useState({})
  const [callAccepted, setCallAccepted] = useState(false)
  const [callEnded, setCallEnded] = useState(false)
  const [name, setName] = useState(localStorage.getItem('storedName') || '')

  const myVideo = useRef()
  const personsVideo = useRef()
  const connectionRef = useRef()

  useEffect(() => {
    /*  Ask the user permission to connect to media devices */
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((currentStream) => {
        setStream(currentStream)

        myVideo.current.srcObject = currentStream
      })

    // Get the id of current user
    socket.on('me', (id) => setMe(id))

    // Receive the call
    socket.on('calluser', ({ from, name: callerName, signal }) =>
      setCall({ isReceivedCall: true, from, name: callerName, signal })
    )
  }, [])

  // When a user answers the call
  const answerCall = () => {
    setCallAccepted(true)

    // Create a peer
    const peer = new Peer({ initiator: false, trickle: false, stream })

    // Accept the call
    peer.on('signal', (data) =>
      socket.emit('answercall', { signal: data, to: call.from })
    )

    // Get Stream
    peer.on(
      'stream',
      (currentStream) => (personsVideo.current.srcObject = currentStream)
    )

    // Define signal info
    peer.signal(call.signal)

    // Connect to other person
    connectionRef.current = peer
  }

  // When a user calls another person
  const callUser = (id) => {
    // Create a peer
    const peer = new Peer({ initiator: true, trickle: false, stream })

    // Call another user
    peer.on('signal', (data) =>
      socket.emit('calluser', {
        userToCall: id,
        signalData: data,
        from: me,
        name,
      })
    )

    // Get Stream
    peer.on(
      'stream',
      (currentStream) => (personsVideo.current.srcObject = currentStream)
    )

    // When another person answers the user's call
    socket.on('callaccepted', (signal) => {
      setCallAccepted(true)

      peer.signal(signal)
    })

    // Connect to other person
    connectionRef.current = peer
  }

  // When a user leaves a call
  const leaveCall = () => {
    setCallEnded(true)

    // End the connection
    connectionRef.current.destroy()

    window.location.reload()
  }

  return (
    <SocketContext.Provider
      value={{
        call,
        callAccepted,
        myVideo,
        personsVideo,
        stream,
        name,
        setName,
        callEnded,
        me,
        callUser,
        leaveCall,
        answerCall,
      }}
    >
      {children}
    </SocketContext.Provider>
  )
}

export { ContextProvider, SocketContext }
