import React from 'react'
import { Typography, AppBar } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import VideoPlayer from './components/VideoPlayer'
import Options from './components/Options'
import Notifications from './components/Notifications'

const useStyles = makeStyles((theme) => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    minHeight: '80vh',
  },
  blue: {
    color: '#4285f4',
  },
  red: {
    color: '#ea4335',
  },
  yellow: {
    color: '#fbbc04',
  },
  green: {
    color: '#34a853',
  },
}))

const App = () => {
  const classes = useStyles()

  return (
    <div>
      <AppBar position="static" color="inherit">
        <Typography variant="h3" color="primary" align="center">
          <span className={classes.blue}>S</span>
          <span className={classes.red}>h</span>
          <span className={classes.yellow}>m</span>
          <span className={classes.blue}>o</span>
          <span className={classes.green}>o</span>
          <span className={classes.red}>m</span>
        </Typography>
      </AppBar>
      <div className={classes.wrapper}>
        <VideoPlayer />
        <Options>
          <Notifications />
        </Options>
      </div>
    </div>
  )
}

export default App
