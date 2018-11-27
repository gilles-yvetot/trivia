import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'unistore/react'
import Wheel from '../components/Wheel'
import Question from '../components/Question'
import Info from '../components/Info'
import actions from '../store/actions'

const styles = () => ({
  root: {
    display: 'flex',
    flex: '1',
    padding: '20px',
    background: '#eaeaea',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    alignItems: 'center',
  },
  top: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '600px',
    padding: '20px 0',
    alignItems: 'center',

  },
});

class Index extends React.Component {
  state = {
  };

  onCategorySelected = category => {
    this.props.setCategory(category)
  }

  onDifficultyChange = difficulty =>{
    this.props.setDifficulty(difficulty)

  }

  render() {
    const {
      classes,
      user,
      question,
      category,
    } = this.props;

    if (user) {
      return (
        <div className={classes.root}>
          <div className={classes.top}>
            <Wheel
              onCategorySelected={this.onCategorySelected}
              onSpin={() => { this.onCategorySelected(null) }}
            />
            <Info user={user} onChange={this.onDifficultyChange} />
          </div>
          {question && category && (
            <Question
              question={question}
              category={category}
            />
          )}
        </div>
      );
    }
    return null
  }
}
Index = connect(store => store, actions)(Index)
Index = withStyles(styles)(Index)
export default Index;
