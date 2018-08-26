import React, {Component} from 'react';
import {connect} from 'react-redux';

import {USER_ACTIONS} from '../../redux/actions/userActions';
import {RACE_ACTIONS} from '../../redux/actions/raceActions';
import {triggerLogout} from '../../redux/actions/loginActions';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import MaterialIcon from 'material-icons-react';

import Header from '../Header/Header';

class UserPage extends Component {
  componentDidMount() {
    this.props.dispatch({type: USER_ACTIONS.FETCH_USER});
    this.props.dispatch({type: RACE_ACTIONS.FETCH_RACES});
  }

  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.userName === null) {
      this.props.history.push('home');
    }
  }

  logout = () => {
    this.props.dispatch(triggerLogout());
  }

  handleNewRace = () => {
    window.location.href = '/#/newrace'
  }

  render() {
    let raceList = [];
    if (this.props.allRaces){
      raceList = this.props.allRaces.map(race => {
        let raceLink = '/#/racedetails/' + race.id;
        let status;
        if (race.start_time && race.finish_time){
          status = 'completed';
        } else if (race.start_time){
          status = 'in progress';
        } else {
          status = 'registering';
        }
        return(
          <Paper elevation={2}>
            <ListItem className="listItem" onClick={() => window.location.href = raceLink} key={race.id}>
              <ListItemIcon>
                <MaterialIcon icon="directions_bike" size="medium" />
              </ListItemIcon>
              <ListItemText primary={race.name} secondary={'Created by: ' + race.race_creator + ' Status: ' + status} />
            </ListItem>
          </Paper>
        )
      })
    }

    return (
      <div>
          <Header title="CHECKPOINT" />
          <List>
            <Paper elevation={10}>
            <ListItem onClick={this.handleNewRace} className="list-button">MAKE A NEW RACE</ListItem>
            </Paper>
            {raceList}
            <Paper elevation={10}>
            <ListItem onClick={this.logout} className="list-button">LOGOUT</ListItem>
            </Paper>
          </List>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  allRaces: state.race.allRaces
});

export default connect(mapStateToProps)(UserPage);

