import React from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = () => ({
});

class Index extends React.Component {
  state = {
  };

  render() {
    const {
      classes
    } = this.props;

    return (
      <div className={classes.root}>
        Hello
      </div>
    );
  }
}

export default withStyles(styles)(Index);
