import React, { useContext } from 'react'
import { Button, Typography } from '@material-ui/core'
import { SocketContext } from '../SocketContext'

const Notifications = () => {
  const { answerCall, leaveCall, call, callAccepted } = useContext(
    SocketContext
  )

  return (
    <>
      {call.isReceivedCall && !callAccepted && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            textAlign: 'center',
          }}
        >
          <Typography variant="h2" gutterBottom>
            {call.name} is calling:
          </Typography>
          <Button variant="contained" color="primary" onClick={answerCall}>
            Answer
          </Button>
          <br />
          <Button variant="contained" color="secondary" onClick={leaveCall}>
            Decline
          </Button>
        </div>
      )}
    </>
  )
}

export default Notifications
