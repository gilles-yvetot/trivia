import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import LinearProgress from '@material-ui/core/LinearProgress';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import { callApi } from '../../util/apiCaller'

const styles = () => ({
  actionContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    height: '50px'
  },
  dialogPaperLogin: {
    width: '370px',
    height: '500px',
  },
  dialogPaperSignup: {
    width: '370px',
    height: '500px',
  },
  dialogContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'flex-start'
  }
});

const checkPassword = password => {
  if (password && password.length < 6) {
    return 'Password length must be greater than 6 characters'
  } else if (password && !/[A-Z]/.test(password)) {
    return 'Password must contain at least 1 capital letter'
  } else if (password && !/[0-9]/.test(password)) {
    return 'Password must contain at least 1 digit'
  } else if (password && !/[a-z]/.test(password)) {
    return 'Password must contain at least 1 lowercase letter'
  }
}

class LoginPopup extends React.Component {

  state = {
    curTab: 0,
    email: '',
    password: '',
    repeatPassword: '',
    loading: false
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };


  login = () => {
    const {
      email,
      password,
    } = this.state

    const {
      setUser,
      setMessage,
      handlePopupClose
    } = this.props

    this.setState({ loading: true })
    callApi('user/login', 'post', {
      event: {
        email,
        password,
        isAdminLogin: true
      }
    })
      .then(({ user, token }) => {
        this.setState({
          loading: false,
          password: '',
          repeatPassword: '',
        })
        setUser(user, token)
        handlePopupClose && handlePopupClose()
        setMessage(`Hey! Welcome back`)
      })
      .catch((err) => {
        this.setState({
          loading: false,
          password: '',
          repeatPassword: '',
        })
        setUser(null, null)
        setMessage(typeof (err.message) == 'string' ? err.message : 'Error while logging in, please try again.', true)
      })
  }

  signup = () => {
    const {
      email,
      password,
    } = this.state

    const {
      setMessage,
    } = this.props

    this.setState({ loading: true })
    callApi('user/signup', 'post', {
      event: {
        email,
        password,
      }
    })
      .then(() => {

        setMessage('Thanks for signing up! Check your email to activate your account.')
        this.setState({
          loading: false,
          password: '',
          repeatPassword: '',
          curTab: 0
        })
      })
      .catch((err) => {

        this.setState({
          loading: false,
        })
        setMessage(typeof (err.message) == 'string' ? err.message : 'Error while creating your account, please try again.', true)
      })
  }

  render() {
    const {
      classes,
      open,
      handlePopupClose
    } = this.props;

    const {
      curTab,
      email,
      repeatPassword,
      password,
      loading,
    } = this.state

    const error = curTab == 1 && checkPassword(password)
    const repeatError = curTab == 1 && repeatPassword && password != repeatPassword

    const disabled = !email ||
      !password ||
      (!repeatPassword && curTab == 1) ||
      (repeatError && curTab == 1) ||
      (error && curTab == 1)

    const tabs = [
      {
        action: this.login,
        label: 'Log in',

      },
      {
        action: this.signup,
        label: 'Sign up'
      }
    ]

    const title = (
      <Tabs
        value={curTab}
        indicatorColor="primary"
        textColor="primary"
        fullWidth
        onChange={(e, value) => this.setState({ curTab: value })}
      >
        {tabs.map(tab => (
          <Tab
            key={tab.label}
            disabled={loading}
            label={tab.label}
          />
        ))}
      </Tabs>
    )

    const actions = loading ?
      (
        <LinearProgress
          key="progressLogin"
          color='primary'
          style={{ width: '30%' }}
        />
      ) :
      (
        <Button
          key='loginSubmit'
          variant="contained"
          color="primary"
          onClick={tabs[curTab].action}
          disabled={disabled}
        >
          {tabs[curTab].label}
        </Button>
      )

    return (
      <Dialog
        open={open}
        classes={{ paper: curTab == 1 ? classes.dialogPaperSignup : classes.dialogPaperLogin }}
        onClose={handlePopupClose}
      >

        <DialogTitle>
          {title}
        </DialogTitle>

        <DialogContent classes={{ root: classes.dialogContent }}>

          <TextField
            onChange={this.handleChange('email')}
            autoFocus
            name='Email'
            onKeyDown={(event) => event.keyCode == 13 && !disabled && tabs[curTab].action()}
            value={email}
            margin="dense"
            label="Email Address"
            type="email"
            fullWidth
          />
          <TextField
            name='Password'
            onChange={this.handleChange('password')}
            onKeyDown={(event) => event.keyCode == 13 && !disabled && tabs[curTab].action()}
            margin="dense"
            label={error ? error : 'Password'}
            type="password"
            error={error ? true : false}
            value={password}
            fullWidth
          />
          <TextField
            name='Repeat password'
            onChange={this.handleChange('repeatPassword')}
            margin="dense"
            label={repeatError ? 'Password different' : 'Repeat Password'}
            onKeyDown={(event) => event.keyCode == 13 && !disabled && tabs[curTab].action()}
            type="password"
            fullWidth
            error={repeatError ? true : false}
            value={repeatPassword}
            style={{ display: curTab == 1 ? 'flex' : 'none' }}
          />
        </DialogContent>

        <DialogActions classes={{ root: classes.actionContainer }}>
          {actions}
        </DialogActions>

      </Dialog>
    );
  }
}

export default withStyles(styles)(LoginPopup);
