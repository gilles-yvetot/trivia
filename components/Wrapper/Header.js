import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper'
import MenuIcon from '@material-ui/icons/Menu'
import LogoutIcon from '@material-ui/icons/PowerSettingsNew'
import Popover from '@material-ui/core/Popover'
import Tooltip from '@material-ui/core/Tooltip';

import red from '@material-ui/core/colors/red';
import blueGrey from '@material-ui/core/colors/blueGrey'


const styles = () => ({
  root: {
    display: 'flex',
    alignItems: 'stretch',
    height: '50px',
    position: 'relative',
    backgroundColor: blueGrey[800],
    boxShadow: '5px 5px 30px 3px rgba(0,0,0,0.2)',
    zIndex: '15'
  },
  left: {
    width: '250px',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingLeft: '10px',
  },
  right: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row-reverse',
    alignItems: 'stretch',
    justifyContent: 'space-between',
    paddingRight: '30px',
  },
  buttons: {
    display: 'flex',
    alignItems: 'center'
  },
  button: {
    cursor: 'pointer',
    width: '22px',
    height: '22px'
  },
  drawerPaper: {
    width: '200px',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column'
  },
  menuIconOpener: {
    borderRadius: '100%',
    width: '40px',
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
  },
  menuIcon: {
    padding: '2px',
    borderRadius: '100%',
    marginBottom: '15px',
    backgroundColor: '#fff',
    width: '50px',
    height: '50px',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0px 0px 10px 1px rgba(0,0,0,0.1)',
    border: '1px solid rgba(0,0,0,0.1)',
    cursor: 'pointer',
    '&:hover': {
      transform: 'scale(1.05)',
      boxShadow: '0px 0px 10px 1px rgba(0,0,0,0.3)',
    },
    transition: [
      ['transform', '500ms'],
      ['box-shadow', '500ms'],
    ]
  },
  popoverPaper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    padding: '9px',
    width: '250px',
    backgroundColor: 'transparent',
    boxShadow: 'none'
  },
  logoWrapper: {
    cursor: 'pointer',
    marginRight: '30px',
  }
});

class Header extends React.Component {

  state = {
    anchorEl: null
  }

  logout = () => {
    const {
      setUser,
      setMessage
    } = this.props

    this.handleClose()
    setMessage('You are now logged out.')
    setUser(null, null)
  }

  handleClick = event => {
    this.setState({
      anchorEl: event.currentTarget,
    });
  };

  handleClose = () => {
    this.setState({
      anchorEl: null,
    });
  };


  render() {

    const {
      classes,
      component,
    } = this.props;

    const {
      anchorEl,
    } = this.state

    const tabs = [
      {
        label: 'Logout',
        action: this.logout,
        icon: LogoutIcon,
        color: red[500]
      }
    ]

    return (
      <Paper elevation={0} component='nav' className={classes.root}>
        <div
          className={classes.right}
          id='headerContainer'
        >
          {component}
          <div className={classes.buttons}>
            <div
              className={classes.menuIconOpener}
              onClick={this.handleClick}
            >
              <MenuIcon
                className={classes.button}
                style={{ color: 'white' }}
              />
            </div>
            <Popover
              open={Boolean(anchorEl)}
              anchorEl={anchorEl}
              onClose={this.handleClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
              }}
              classes={{
                paper: classes.popoverPaper
              }}
            >
              {tabs.map(tab => (
                <div
                  key={tab.label}
                  onClick={() => { tab.action(); this.handleClose() }}
                  className={classes.menuIcon}
                >
                  <Tooltip enterDelay={100} placement='left' id={tab.label} title={tab.label}>
                    {tab.icon ? (
                      <tab.icon
                        color='primary'
                        className={classes.button}
                        style={{ color: tab.color }}
                      />
                    ) :
                      (tab.component)
                    }
                  </Tooltip>
                </div>
              ))}
            </Popover>
          </div>
        </div>
      </Paper>
    );
  }
}

export default withStyles(styles)(Header);
