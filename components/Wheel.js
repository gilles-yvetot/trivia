import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import blueGrey from '@material-ui/core/colors/blueGrey'
import debounce from '../util/debounce'
import wedgesConfig from './wheelConfig'

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
  wrapper: {
    position: 'relative',
  },
  txt: {
    color: '#eaeaea',
  },
  sec: {
    opacity: '1',
  },
  wheel: {
    width: '250px',
    height: '250px',
    borderRadius: '50%',
    position: 'relative',
    overflow: 'hidden',
    border: '8px solid #fff',
    boxShadow: 'rgba(0,0,0,0.2) 0px 0px 10px, rgba(0,0,0,0.05) 0px 3px 0px',
    transform: 'rotate(0deg)',
    '&:before': {
      content: '""',
      position: 'absolute',
      border: '4px solid rgba(0,0,0,0.1) ',
      width: '242px',
      height: '242px',
      borderRadius: '50%',
      zIndex: '1000',
    },

    '& $sec': {
      position: 'absolute',
      width: '0',
      height: '0',
      borderStyle: 'solid',
      borderWidth: '130px 75px 0',
      borderColor: '#19c transparent',
      transformOrigin: '75px 129px',
      left: '44px',
      top: '-4px',
    },
    '& $sec .fa': {
      marginTop: '-100px',
      color: 'rgba(0,0,0,0.34) ',
      position: 'relative',
      zIndex: '10000000',
      display: 'block',
      textAlign: 'center',
      fontSize: '30px',
      marginLeft: '-15px',
      // textShadow: 'rgba(255,255,255,0.1) 0px -1px 0px, rgba(0,0,0,0.2) 0px 1px 0px',
    },
  },

  innerWheel: {
    width: '100%',
    height: '100%',
    transition: 'all 6s cubic-bezier(0, .99, .44, .99)',
  },
  spin: {
    width: '68px',
    height: '68px',
    position: 'absolute',
    top: '50%',
    left: '50%',
    margin: '-34px 0 0 -34px',
    borderRadius: '50%',
    boxShadow: 'rgba(0,0,  0,  0.1) 0px 3px 0px',
    zIndex: '1000',
    background: '#fff',
    cursor: 'pointer',
    userSelect: 'none',

    '&:before': {
      content: '""',
      position: 'absolute',
      width: '0',
      height: '0',
      borderStyle: 'solid',
      borderWidth: '0 20px 28px 20px',
      borderColor: 'transparent transparent #ffffff transparent',
      top: '-12px',
      left: '14px',
    },
    '&:after': {
      content: '"SPIN"',
      textAlign: 'center',
      lineHeight: '68px',
      fontFamily: 'Roboto, sans-serif',
      color: '#CCC',
      // textShadow: '0 2px 0 #fff, 0 -2px 0 rgba(0,0,0,0.3)',
      position: 'relative',
      zIndex: '100000',
      width: '68px',
      height: '68px',
      display: 'block',
    },
    '&:active .innerSpin': {
      boxShadow: 'rgba(0, 0, 0, 0.4) 0px 0px 5px inset',
    },
    '&:active:after': {
      fontSize: '15px'
    }

  },

  innerSpin: {
    width: '54px',
    height: '54px',
    position: 'absolute',
    top: '50%',
    left: '50%',
    margin: '-27px 0 0 -27px',
    borderRadius: '50%',
    // background: 'red',
    zIndex: '999',
    boxShadow: 'rgba(255,  255,255,1) 0px -2px 0px inset, rgba(255,  255,  255,  1) 0px 2px 0px inset, rgba(0,0,0,0.4) 0px 0px 5px',
    background: 'radial-gradient(ellipse at center, rgba(255, 255, 255, 1) 0%, rgba(234, 234, 234, 1) 100%)',
  },
  shine: {
    width: '250px',
    height: '250px',
    position: 'absolute',
    top: '0',
    left: '0',
    background: 'radial-gradient(ellipse at center, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.99) 1%, rgba(255, 255, 255, 0.91) 9%, rgba(255, 255, 255, 0) 100%)',
    opacity: '0.1',
  },

  '@keyframes hh': {
    '0%, 100%': {
      transform: 'rotate(0deg)',
    },
    '50%': {
      transform: 'rotate(7deg)',
    }
  },

  spinning: {
    animation: '$hh 0.1s'
  }

})

class Wheel extends React.Component {

  state = {
    degree: 0,
    clicks: 0,
    wedgeCount: wedgesConfig.length,
    wedgeAngle: 360 / wedgesConfig.length,
  }

  onWheelEnd = debounce(() => {
    const { degree, wedgeAngle } = this.state
    // we substract an half wedge because the starting position is at the middle of one wedge
    let tmp = degree + wedgeAngle / 2
    tmp = tmp % 360
    tmp = 360 - tmp
    tmp = tmp / wedgeAngle
    tmp = Math.floor(tmp)
    if (this.props.onCategorySelected) {
      this.props.onCategorySelected(wedgesConfig[tmp])
    }
  }, 6000)

  handleClick = () => {

    let { clicks, degree } = this.state

    clicks++
    /*multiply the degree by number of clicks
    generate random number between 1 - 360,
    then add to the new degree*/
    degree = 1800 * clicks;
    degree += Math.floor(Math.random() * (360 - 1 + 1)) + 1;
    this.setState({
      degree,
      clicks,
    })
    this.onWheelEnd()
  };


  render() {

    const { classes, } = this.props;
    const { degree, wedgeCount, wedgeAngle } = this.state;


    return (
      <div className={classes.wrapper}>

        <div className={classes.wheel}>
          <div
            className={classes.innerWheel}
            style={{
              'transform': 'rotate(' + degree + 'deg)'
            }}
          >
            {wedgesConfig.map(({ icon, color }, idx) => (
              <div
                key={`wedge_${color}`}
                className={classes.sec}
                style={{
                  transform: `rotate(${parseInt((wedgeAngle) * (idx + 1))}deg)`,
                  borderColor: color,
                }}
              >
                <span className={icon} />
              </div>
            ))}
          </div>

          <div className={classes.spin} onClick={this.handleClick}>
            <div className={classes.innerSpin} />
          </div>
          <div className={classes.shine} />
        </div>
      </div>
    );
  }
}
export default withStyles(styles)(Wheel);

