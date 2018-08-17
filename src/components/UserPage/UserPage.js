import React, {Component} from 'react';
import {connect} from 'react-redux';

import {USER_ACTIONS} from '../../redux/actions/userActions';
import {RACE_ACTIONS} from '../../redux/actions/raceActions';
import {triggerLogout} from '../../redux/actions/loginActions';

import {Link} from 'react-router-dom';

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
    let content = null;
    const raceTableBody = this.props.allRaces.map((race) => {
      const raceLink = '/racedetails/' + race.id;
      let status;
      if (race.start_time && race.finish_time){
        status = 'completed';
      } else if (race.start_time){
        status = 'in progress';
      } else {
        status = 'registering';
      }
      return(
        <tr key={race.id}>
          <td>{race.name}</td>
          <td>{race.race_creator}</td>
          <td>{status}</td>
          <td><Link to={raceLink}>--></Link></td>
        </tr>
      )
    })

    if (this.props.user.userName) {
      content = (
        <div>
          <button
            onClick={this.logout}
          >
            Log Out
          </button>
          <button onClick={this.handleNewRace}>Create a Race</button>
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
        {content}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  allRaces: state.race.allRaces
});

export default connect(mapStateToProps)(UserPage);

