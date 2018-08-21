import React, {Component} from 'react';
import {connect} from 'react-redux';

import {USER_ACTIONS} from '../../redux/actions/userActions';
import {RACE_ACTIONS} from '../../redux/actions/raceActions';
import {triggerLogout} from '../../redux/actions/loginActions';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MaterialIcon from 'material-icons-react';
import Button from '@material-ui/core/Button';

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
            <ListItem className="listItem" onClick={() => window.location.href = raceLink} button key={race.id}>
              <ListItemIcon>
                <MaterialIcon icon="directions_bike" size="medium" />
              </ListItemIcon>
              <ListItemText primary={race.name} secondary={'Created by: ' + race.race_creator + ' Status: ' + status} />
            </ListItem>
        )
      })
    }

    // const raceTableBody = this.props.allRaces.map((race) => {
    //   const raceLink = '/racedetails/' + race.id;

    //   return(
    //     <tr key={race.id}>
    //       <td>{race.name}</td>
    //       <td>{race.race_creator}</td>
    //       <td>{status}</td>
    //       <td><Link to={raceLink}>--></Link></td>
    //     </tr>
    //   )
    // })

    return (
      <div>
          <Header title="Checkpoint" />
          <Button onClick={this.logout}>Log Out</Button>
          <Button onClick={this.handleNewRace}>Create a Race</Button>
          <List>{raceList}</List>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  allRaces: state.race.allRaces
});

export default connect(mapStateToProps)(UserPage);

