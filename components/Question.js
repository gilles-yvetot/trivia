import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Proptypes from 'prop-types'
import Button from '@material-ui/core/Button';

const styles = () => ({
  root: {
    width: '600px',
    color: 'rgba(0, 0, 0, 0.67)',
    fontSize: '18px',
    background: '#fff',
  },
  paper: {
    borderRadius: '4px',
    boxShadow: '0px 1px 3px 0px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.12)',
    overflow: 'hidden',
  },
  padding: {
    padding: '10px',
  },
  title: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: '#fff',
    fontSize: '24px',
  },
  question: {

  },
  answer: {
    margin: '5px 0',
    cursor: 'pointer',
    fontSize: '16px',
    textAlign: 'center',
    width: '100%'
  },
})

class Question extends React.Component {

  state = {}

  shuffleArray = (a) => {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  onAnswerClick = ans => {

  }

  render = () => {

    const {
      classes,
      category,
      question,
    } = this.props;

    const answers = this.shuffleArray([].concat(...question.incorrect_answers, question.correct_answer))

    return (
      <div className={`${classes.paper} ${classes.root}`}>
        <div
          className={`${classes.title} ${classes.padding}`}
          style={{ background: category.color }}
        >
          <div>{decodeURIComponent(question.category)}</div>
          <i className={category.icon} />
        </div>
        <div className={`${classes.question} ${classes.padding}`}>{decodeURIComponent(question.question)}</div>
        <div className={`${classes.padding}`}>
          {answers.map(ans => (
            <Button
              onClick={() => { this.onAnswerClick(ans) }}
              variant="extendedFab"
              aria-label={decodeURIComponent(ans)}
              className={`${classes.paper} ${classes.answer} ${classes.padding}`}
            >
              {decodeURIComponent(ans)}
            </Button>
          ))}
        </div>
      </div>
    );
  }
}

Question.propTypes = {
  question: Proptypes.shape({
    question: Proptypes.string.isRequired,
    category: Proptypes.string.isRequired,
    correct_answer: Proptypes.string.isRequired,
    incorrect_answers: Proptypes.arrayOf(Proptypes.string).isRequired
  }),
  category: Proptypes.shape({
    data: Proptypes.number,
    icon: Proptypes.string.isRequired,
    color: Proptypes.string.isRequired,
  })
}
Question = withStyles(styles)(Question)

export default Question;

