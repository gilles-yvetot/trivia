import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'unistore/react'
import Wheel from '../components/Wheel'
import Question from '../components/Question'
import actions from '../store/actions'

const styles = () => ({
  root: {
    display: 'flex',
    flex: '1',
    padding: '20px',
    fontFamily: 'Roboto, sans-serif',
    background: '#eaeaea',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    alignItems: 'center',
  }
});

class Index extends React.Component {
  state = {
  };

  onCategorySelected = category => {
    this.props.setCategory(category)
  }

  render() {
    const {
      classes,
      user,
      question,
    } = this.props;
    if (user) {
      return (
        <div className={classes.root}>
          <Wheel onCategorySelected={this.onCategorySelected} />
          {question && <Question question={question} />}
        </div>
      );
    }
    return null
  }
}
Index = connect(store => store, actions)(Index)
Index = withStyles(styles)(Index)
export default Index;
