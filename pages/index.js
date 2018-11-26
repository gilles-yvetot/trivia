import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'unistore/react'

import actions from '../store/actions'


const styles = () => ({
});

class Index extends React.Component {
  state = {
  };

  render() {
    const {
      classes,
      user,
    } = this.props;
    return (
      <div className={classes.root}>
        Hello&nbsp;
        {user && user.email || ''}
      </div>
    );
  }
}
Index = connect(store => store, actions)(Index)
Index = withStyles(styles)(Index)
export default Index;
