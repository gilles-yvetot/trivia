import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import { connect } from 'unistore/react'
import { withRouter } from 'next/router'
import Header from './Header'
import LoginPopup from './LoginPopup'

import actions from '../../store/actions'

const styles = theme => ({
  alert: {
    backgroundColor: theme.palette.error.dark
  },
  main: {
    display: 'flex',
    alignItems: 'stretch',
  },
});

class Wrapper extends React.Component {
  state = {
  };

  componentWillMount() {

    const {
      setUser,
      retrievedUser,
      token,
    } = this.props

    setUser(retrievedUser || null, token || null)

  }

  render() {
    const {
      classes,
      router,
      user,
      setUser,
      children,
      message,
      isAlert,
      setMessage,
      headerComponent,
    } = this.props;

    return ([
      <Header
        key='header'
        setMessage={setMessage}
        setUser={setUser}
        component={headerComponent}
        router={router}
      />,
      <main
        className={classes.main}
        key='container'
      >
        {children}
      </main>,
      (!user) && (
        <LoginPopup
          key="loginPopup"
          open={!user ? true : false}
          setUser={setUser}
          setMessage={setMessage}
        />
      ),
      <Snackbar
        key='snackbar'
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        ContentProps={{
          classes: {
            root: isAlert && classes.alert
          }
        }}
        open={!!message}
        autoHideDuration={4000}
        onClose={() => setMessage('')}
        message={message}
      />
    ]);
  }
}

export default connect(store => store, actions)(withRouter(withStyles(styles)(Wrapper)))
