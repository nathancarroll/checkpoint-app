import React, { Component } from 'react';
import { connect } from 'react-redux';

import Nav from '../../components/Nav/Nav';

import {USER_ACTIONS} from '../../redux/actions/userActions';
import {RACE_ACTIONS} from '../../redux/actions/raceActions';
import { triggerLogout } from '../../redux/actions/loginActions';

import InitNewRace from '../../components/InitNewRace/InitNewRace';
import CheckpointMap from '../../components/CheckpointMap/CheckpointMap';


const mapStateToProps = state => ({
  user: state.user,
  allRaces: state.race.allRaces
});

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
    // this.props.history.push('home');
  }

  raceDetails = () => {
    console.log('click');
  }

  render() {
    let content = null;
    const raceTableBody = this.props.allRaces.map((race) => {
      return(
        <tr key={race.id}>
          <td>{race.name}</td>
          <td>{race.race_creator}</td>
          <td>STATUS</td>
          <td><button onClick={this.raceDetails}>Go To Details</button></td>
        </tr>
      )
    })

    if (this.props.user.userName) {
      content = (
        <div>
          <h1
            id="welcome"
          >
            Welcome, { this.props.user.userName }!
          </h1>
          <p>Your ID is: {this.props.user.id}</p>
          <button
            onClick={this.logout}
          >
            Log Out
          </button>
          {JSON.stringify(this.props.allRaces)}
          <table>
            <thead>
              <tr>
                <th>Race</th><th>Creator</th><th>Status</th><th>Details</th>
              </tr>
            </thead>
            <tbody>{raceTableBody}</tbody>
          </table>
        </div>
      );
    }

    return (
      <div>
        <Nav />
        { content }
        <InitNewRace />
        <CheckpointMap />
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(UserPage);

