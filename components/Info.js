import React from 'react';
import PropTypes from 'prop-types'
import Avatar from '@material-ui/core/Avatar';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import blueGrey from '@material-ui/core/colors/blueGrey'

import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    width: '200px',
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
  avatar: {
    backgroundColor: blueGrey[800]
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    height: '180px',
  },
  content: {
    flex: '1 0 auto',
  },
});

class Info extends React.Component {
  state = {
    difficulty: ''
  }

  handleChange = event => {
    this.setState({ difficulty: event.target.value });
    if (this.props.onChange) {
      this.props.onChange(event.target.value)
    }
  };

  render = () => {
    const { user, classes } = this.props
    return (
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <Avatar className={classes.avatar} aria-label="initials">{user.email[0].toUpperCase()}</Avatar>
          }
          title={user.email}
          subheader={`${user.correct || 0} correct answer${user.correct ? 's' : ''}`}
        />
        <CardContent className={classes.content}>
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel
              ref={ref => { this.InputLabelRef = ref; }}
              htmlFor="outlined-difficulty-simple"
            >
              Difficulty
            </InputLabel>
            <Select
              value={this.state.difficulty}
              onChange={this.handleChange}
              input={(
                <OutlinedInput
                  labelWidth={60}
                  name="difficulty"
                  id="outlined-difficulty-simple"
                />
              )}
            >
              <MenuItem color={blueGrey[800]} value=''><em>All</em></MenuItem>
              <MenuItem value='easy'>Easy</MenuItem>
              <MenuItem value='medium'>Medium</MenuItem>
              <MenuItem value='hard'>Hard</MenuItem>
            </Select>
          </FormControl>
        </CardContent>
      </Card>

    )
  }
}

Info.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Info);
